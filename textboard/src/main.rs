#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod comms;
mod monitor_clipboard;

use directories::ProjectDirs;
use eframe::{egui, App, Frame, NativeOptions};
use egui::Context;
use std::fs::{read_to_string, write};
use std::thread::{self};
use tokio::runtime::Runtime;
use tokio::sync::{broadcast, watch};

struct TextBoard {
    identifier: String,
    identifier_sender: watch::Sender<String>,
}

impl App for TextBoard {
    fn update(&mut self, ctx: &Context, _frame: &mut Frame) {
        egui::CentralPanel::default().show(ctx, |ui| {
            ui.heading("TextBoard");
            ui.label("Identifier:");
            let text_edit_singleline = ui.text_edit_singleline(&mut self.identifier);
            if text_edit_singleline.changed() {
                let _ = self.identifier_sender.send(self.identifier.clone());

                if let Some(project_dirs) = ProjectDirs::from("", "", "TextBoard") {
                    let data_dir = ProjectDirs::data_dir(&project_dirs);
                    let _ = write(data_dir.join("identifier"), self.identifier.clone());
                }
            }
        });
    }
}

fn main() -> Result<(), eframe::Error> {
    let (clipboard_sender, clipboard_receiver) = broadcast::channel::<String>(10);
    let (identifier_sender, identifier_receiver) = watch::channel::<String>(String::new());

    if let Some(project_dirs) = ProjectDirs::from("", "", "TextBoard") {
        let data_dir = ProjectDirs::data_dir(&project_dirs);
        if let Ok(cached_identifier) = read_to_string(data_dir.join("identifier")) {
            let _ = identifier_sender.send(cached_identifier.clone());
        }
    }

    let text_board = TextBoard {
        identifier: (*identifier_receiver.borrow()).clone(),
        identifier_sender: identifier_sender,
    };

    // Create a new thread to monitor the clipboard on
    thread::spawn(|| monitor_clipboard::monitor_clipboard(clipboard_sender));

    // Create a new thread for async websocket
    thread::spawn(move || match Runtime::new() {
        Ok(runtime) => runtime.block_on(comms::make_connections(
            clipboard_receiver,
            identifier_receiver,
        )),
        Err(err) => eprintln!("Error creating a new runtime: {}", err),
    });

    // Start GUI
    return eframe::run_native(
        "TextBoard",
        NativeOptions::default(),
        Box::new(|_cc| Box::new(text_board)),
    );
}
