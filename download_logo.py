import os
import sys
import requests
from tkinter import Tk, Label, Entry, Button, StringVar, filedialog, messagebox
from PIL import Image, ImageTk
import io
import base64

class LogoDownloader:
    def __init__(self, root):
        self.root = root
        self.root.title("Logo Downloader Tool")
        self.root.geometry("600x400")
        self.root.configure(bg="#f0f0f0")
        
        # Instructions
        Label(root, text="To download your logo from Looka.com:", 
              font=("Arial", 12, "bold"), bg="#f0f0f0").pack(pady=(20, 5))
        
        instructions = [
            "1. Visit your logo at https://looka.com/editor/219944293",
            "2. Log in to your Looka account if needed",
            "3. Find your logo in the editor",
            "4. Right-click on the logo and select 'Save image as...'",
            "5. Save it as 'fundraisers-united-logo.png' in the 'images' folder",
            "- OR -",
            "6. Use the screenshot tool to capture your logo",
            "7. Use this utility to download from any image URL:"
        ]
        
        for instruction in instructions:
            Label(root, text=instruction, font=("Arial", 10), 
                  anchor="w", justify="left", bg="#f0f0f0").pack(fill="x", padx=20)
        
        # URL Entry
        self.url_var = StringVar()
        Label(root, text="Image URL:", font=("Arial", 10, "bold"), 
              bg="#f0f0f0").pack(anchor="w", padx=20, pady=(20, 5))
        Entry(root, textvariable=self.url_var, width=60).pack(padx=20)
        
        # Buttons
        Button(root, text="Download Image", bg="#4361ee", fg="white", 
               font=("Arial", 10, "bold"), command=self.download_image).pack(pady=(15, 5))
        
        Button(root, text="Take Screenshot", bg="#7209b7", fg="white", 
               font=("Arial", 10, "bold"), command=self.take_screenshot).pack(pady=5)
               
        # Status
        self.status_var = StringVar()
        self.status_var.set("Ready to download")
        Label(root, textvariable=self.status_var, font=("Arial", 10), 
              bg="#f0f0f0", fg="#333").pack(pady=15)
              
    def download_image(self):
        url = self.url_var.get().strip()
        if not url:
            messagebox.showerror("Error", "Please enter an image URL")
            return
            
        try:
            response = requests.get(url, stream=True)
            response.raise_for_status()
            
            # Check if it's an image
            content_type = response.headers.get('Content-Type', '')
            if not content_type.startswith('image/'):
                messagebox.showerror("Error", f"URL does not point to an image (content type: {content_type})")
                return
                
            # Ask where to save
            file_path = filedialog.asksaveasfilename(
                defaultextension=".png",
                initialfile="fundraisers-united-logo.png",
                initialdir=os.path.join(os.getcwd(), "images"),
                filetypes=[("PNG files", "*.png"), ("All files", "*.*")]
            )
            
            if not file_path:
                return
                
            # Save the image
            with open(file_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
                    
            self.status_var.set(f"Image saved to {file_path}")
            messagebox.showinfo("Success", f"Image successfully saved to:\n{file_path}")
            
        except Exception as e:
            self.status_var.set(f"Error: {str(e)}")
            messagebox.showerror("Error", f"Failed to download image: {str(e)}")
    
    def take_screenshot(self):
        try:
            # Minimize the window
            self.root.iconify()
            self.root.after(500, self._take_screenshot_delayed)
        except Exception as e:
            messagebox.showerror("Error", f"Failed to take screenshot: {str(e)}")
    
    def _take_screenshot_delayed(self):
        try:
            import pyautogui
            import time
            
            # Wait for user to set up
            time.sleep(2)
            
            # Tell user to select area
            messagebox.showinfo("Screenshot", "Click and drag to select the logo area")
            
            # Take the screenshot
            screenshot = pyautogui.screenshot()
            
            # Ask where to save
            file_path = filedialog.asksaveasfilename(
                defaultextension=".png",
                initialfile="fundraisers-united-logo.png",
                initialdir=os.path.join(os.getcwd(), "images"),
                filetypes=[("PNG files", "*.png"), ("All files", "*.*")]
            )
            
            if file_path:
                screenshot.save(file_path)
                self.status_var.set(f"Screenshot saved to {file_path}")
                messagebox.showinfo("Success", f"Screenshot saved to:\n{file_path}")
            
            # Restore the window
            self.root.deiconify()
            
        except ImportError:
            self.root.deiconify()
            messagebox.showerror("Error", "PyAutoGUI is not installed. Please install it using: pip install pyautogui")
        except Exception as e:
            self.root.deiconify()
            messagebox.showerror("Error", f"Failed to take screenshot: {str(e)}")

if __name__ == "__main__":
    try:
        root = Tk()
        app = LogoDownloader(root)
        root.mainloop()
    except Exception as e:
        print(f"Error starting application: {str(e)}") 