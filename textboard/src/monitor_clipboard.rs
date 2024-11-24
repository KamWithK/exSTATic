use std::thread::sleep;
use std::time::Duration;

use copypasta::{ClipboardContext, ClipboardProvider};
use tokio::sync::broadcast;

pub(crate) fn monitor_clipboard(clipboard_sender: broadcast::Sender<String>) {
    let clipboard = ClipboardContext::new();
    let mut current_text = String::new();

    match clipboard {
        Ok(mut clipboard) => loop {
            match clipboard.get_contents() {
                Ok(text) => {
                    if current_text != text {
                        current_text = text;
                        let _ = clipboard_sender.send(current_text.clone());
                    }
                }
                Err(err) => eprintln!("Error reading clipboard text: {}", err),
            }
            sleep(Duration::from_millis(500));
        },
        Err(err) => eprintln!("Error initialising clipboard: {}", err),
    }
}
