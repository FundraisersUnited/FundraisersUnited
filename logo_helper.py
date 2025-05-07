import os
import urllib.request
import webbrowser
import tkinter as tk
from tkinter import messagebox, filedialog

def main():
    # Create main window
    root = tk.Tk()
    root.title("Fundraisers United Logo Helper")
    root.geometry("500x350")
    root.configure(bg="#f0f0f0")
    
    # Title
    tk.Label(root, text="Fundraisers United Logo Helper", 
          font=("Arial", 16, "bold"), bg="#f0f0f0").pack(pady=(20, 15))

    # Instructions
    instructions = [
        "1. Visit your logo at: https://looka.com/editor/219944293",
        "2. Download your logo by right-clicking and 'Save image as'",
        "3. Save it as 'fundraisers-united-logo.png' in the 'images' folder",
        "",
        "OR paste a direct image URL below:"
    ]
    
    for instruction in instructions:
        tk.Label(root, text=instruction, font=("Arial", 10), 
               bg="#f0f0f0", anchor="w").pack(fill="x", padx=20, pady=2)
    
    # URL input
    url_var = tk.StringVar()
    tk.Label(root, text="Image URL:", font=("Arial", 10, "bold"), 
           bg="#f0f0f0").pack(anchor="w", padx=20, pady=(15, 5))
    tk.Entry(root, textvariable=url_var, width=50).pack(padx=20, pady=5)
    
    def open_looka():
        webbrowser.open("https://looka.com/editor/219944293")
    
    def download_from_url():
        url = url_var.get().strip()
        if not url:
            messagebox.showerror("Error", "Please enter an image URL")
            return
            
        try:
            # Ask where to save
            download_dir = os.path.join(os.getcwd(), "images")
            os.makedirs(download_dir, exist_ok=True)
            
            file_path = filedialog.asksaveasfilename(
                defaultextension=".png",
                initialfile="fundraisers-united-logo.png",
                initialdir=download_dir,
                filetypes=[("PNG files", "*.png"), ("JPEG files", "*.jpg"), ("All files", "*.*")]
            )
            
            if not file_path:
                return
                
            # Download the image
            urllib.request.urlretrieve(url, file_path)
            
            messagebox.showinfo("Success", f"Image saved to:\n{file_path}")
            
        except Exception as e:
            messagebox.showerror("Error", f"Failed to download image: {str(e)}")
    
    def open_images_folder():
        images_dir = os.path.join(os.getcwd(), "images")
        os.makedirs(images_dir, exist_ok=True)
        
        # Open file explorer to the images directory
        if os.name == 'nt':  # Windows
            os.startfile(images_dir)
        else:
            webbrowser.open('file://' + images_dir)
    
    # Buttons
    button_frame = tk.Frame(root, bg="#f0f0f0")
    button_frame.pack(pady=20)
    
    tk.Button(button_frame, text="1. Open Looka", bg="#4361ee", fg="white", 
            font=("Arial", 10, "bold"), command=open_looka).grid(row=0, column=0, padx=10)
            
    tk.Button(button_frame, text="2. Open Images Folder", bg="#7209b7", fg="white", 
            font=("Arial", 10, "bold"), command=open_images_folder).grid(row=0, column=1, padx=10)
            
    tk.Button(button_frame, text="3. Download from URL", bg="#38b000", fg="white", 
            font=("Arial", 10, "bold"), command=download_from_url).grid(row=0, column=2, padx=10)
    
    # Help text
    tk.Label(root, text="This tool will help you download and save your logo.", 
           font=("Arial", 9), bg="#f0f0f0").pack(pady=(20, 0))
    tk.Label(root, text="Once saved, it will automatically appear on your website.", 
           font=("Arial", 9), bg="#f0f0f0").pack()
    
    # Run the application
    root.mainloop()

if __name__ == "__main__":
    main() 