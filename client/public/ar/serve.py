import http.server
import socketserver
import socket
import threading
import subprocess
import time
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

if __name__ == "__main__":
    local_ip = get_local_ip()

    # Start local HTTP server in background thread
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()

    print("\n" + "=" * 65)
    print("      🏛️  TAJ MAHAL WEBAR SERVER IS RUNNING!")
    print("=" * 65)
    print(f"\n  [1] On your Computer:")
    print(f"      👉  http://localhost:{PORT}")
    print(f"\n  [2] On your Phone (Same Wi-Fi):")
    print(f"      👉  http://{local_ip}:{PORT}")
    print("\n" + "-" * 65)
    print("  Creating an INSTANT SECURE HTTPS LINK for your phone...")
    print("  (Mobile browsers require HTTPS for Camera & AR permissions)")
    print("-" * 65)

    # Start SSH Pinggy tunnel for instant public HTTPS URL
    try:
        tunnel_cmd = [
            "ssh", "-p", "443",
            "-R", f"0:localhost:{PORT}",
            "-o", "StrictHostKeyChecking=no",
            "-o", "ServerAliveInterval=30",
            "a.pinggy.io"
        ]
        process = subprocess.Popen(
            tunnel_cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )

        for line in process.stdout:
            if "https://" in line:
                # Find the https URL in output
                words = line.strip().split()
                for word in words:
                    if word.startswith("https://"):
                        print(f"\n  🎉 [3] MOBILE HTTPS URL (Works on ANY phone anywhere):")
                        print(f"      👉  {word}\n")
                        print("=" * 65)
                        print("  📱 Open this link on your phone (Chrome/Safari) & tap 'VIEW IN AR'!")
                        print("  Press Ctrl+C to stop.")
                        print("=" * 65 + "\n")
                        break
    except Exception as e:
        print(f"\n  Note: Could not create SSH tunnel: {e}")
        print(f"  You can use: http://{local_ip}:{PORT} on the same Wi-Fi.\n")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nServer stopped.")
