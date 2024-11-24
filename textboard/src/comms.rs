use futures_util::{SinkExt, StreamExt};
use serde_json::json;
use tokio::{
    net::{TcpListener, TcpStream},
    sync::{broadcast, watch},
};

pub(crate) async fn make_connections(
    clipboard_receiver: broadcast::Receiver<String>,
    identifier_receiver: watch::Receiver<String>,
) {
    if let Ok(server) = TcpListener::bind("localhost:9001").await {
        while let Ok((stream, _)) = server.accept().await {
            tokio::spawn(accept_connection(
                stream,
                clipboard_receiver.resubscribe(),
                identifier_receiver.clone(),
            ));
        }
    }
}

async fn accept_connection(
    stream: TcpStream,
    mut clipboard_receiver: broadcast::Receiver<String>,
    identifier_receiver: watch::Receiver<String>,
) {
    if let Ok(ws_stream) = tokio_tungstenite::accept_async(stream).await {
        let (mut write, _) = ws_stream.split();

        while let Ok(message) = clipboard_receiver.recv().await {
            let proccess_path: String = (*identifier_receiver.borrow()).clone();
            if proccess_path.is_empty() {
                eprintln!("Error empty process path")
            }
            let _ = write
                .send(
                    json!({
                        "sentence": message,
                        "process_path": proccess_path
                    })
                    .to_string()
                    .into(),
                )
                .await;
        }
    }
}
