from ultralytics import YOLO

# 1. Load the official, pretrained YOLO11 Nano model (it will download the weights automatically)
model = YOLO('yolo11n.pt')

# 2. Run inference. 'bus.jpg' is a default test image built into the ultralytics library.
print("Running VisionFlow ML Pipeline...")
results = model('Open_refrigerator_with_food_at_night.jpg') # returns a list

# 3. Create an empty dictionary to hold our counts
inventory = {}

# 4. Translate the math into readable text
for r in results: #each r is one image
    print("\n--- VISIONFLOW DETECTED ---")
    for box in r.boxes: # Each box = one detected object (person, bus, car, etc.)
        # Extract the label and confidence score
        class_id = int(box.cls[0])
        class_name = model.names[class_id] # {0: 'person', 1: 'bicycle', 2: 'car', ...}
        confidence = float(box.conf[0]) * 100 # probability (0–1). Multiply by 100 → percentage

        # 5. Update our inventory dictionary
        if class_name in inventory:
            inventory[class_name] += 1
        else:
            inventory[class_name] = 1
#           Inside each box you have:
#           coordinates (not used here)
#           class ID
#           confidence score

        print(f"Found: {class_name} (Confidence): {confidence:.1f}%")

# 6. Print the final clean data structure
print("\n--- VISIONFLOW  REPORT ---")
print(inventory)