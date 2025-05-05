from PIL import Image, ImageDraw
import os

# Ensure images directory exists
if not os.path.exists('images'):
    os.makedirs('images')

# Create hero background - dark blue gradient
img = Image.new('RGB', (1200, 600), color=(33, 37, 41))
draw = ImageDraw.Draw(img)
for y in range(600):
    for x in range(1200):
        # Create a subtle gradient
        r = int(33 + (x / 1200) * 20)
        g = int(37 + (y / 600) * 10)
        b = int(41 + (x / 1200) * 15 + (y / 600) * 15)
        draw.point((x, y), fill=(r, g, b))
img.save('images/hero-bg.jpg')

# Create team placeholder - blue gradient
img = Image.new('RGB', (600, 400), color=(67, 97, 238))
draw = ImageDraw.Draw(img)
for y in range(400):
    for x in range(600):
        # Create a gradient
        r = int(67 + (x / 600) * 10)
        g = int(97 + (y / 400) * 20)
        b = int(238 - (y / 400) * 30)
        draw.point((x, y), fill=(r, g, b))
img.save('images/team-placeholder.jpg')

# Create charity placeholder - purple gradient
img = Image.new('RGB', (600, 400), color=(114, 9, 183))
draw = ImageDraw.Draw(img)
for y in range(400):
    for x in range(600):
        # Create a gradient
        r = int(114 + (x / 600) * 20)
        g = int(9 + (y / 400) * 10)
        b = int(183 - (y / 400) * 20)
        draw.point((x, y), fill=(r, g, b))
img.save('images/charity-placeholder.jpg')

# Create testimonial author placeholder - green gradient in a circle
img = Image.new('RGB', (200, 200), color=(255, 255, 255))
draw = ImageDraw.Draw(img)
# Draw circle with gradient
for y in range(200):
    for x in range(200):
        # Calculate distance from center
        dx = x - 100
        dy = y - 100
        distance = (dx**2 + dy**2)**0.5
        
        if distance <= 100:  # Inside circle
            # Create a radial gradient
            factor = distance / 100
            r = int(56 + (1-factor) * 30)
            g = int(176 + (1-factor) * 30)
            b = int(0 + (1-factor) * 30)
            draw.point((x, y), fill=(r, g, b))
img.save('images/testimonial1-placeholder.jpg')

# Create favicon with F letter
img = Image.new('RGBA', (64, 64), color=(67, 97, 238, 255))
draw = ImageDraw.Draw(img)
# Add a darker blue circle in center
draw.ellipse((8, 8, 56, 56), fill=(58, 84, 207, 255))
# Draw an "F" in white
draw.rectangle((22, 18, 32, 48), fill=(255, 255, 255, 255))
draw.rectangle((22, 18, 44, 28), fill=(255, 255, 255, 255))
draw.rectangle((22, 30, 38, 38), fill=(255, 255, 255, 255))
img.save('images/favicon.png')

print("Images created successfully!") 