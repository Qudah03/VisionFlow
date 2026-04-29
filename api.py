from fastapi import FastAPI, File, UploadFile
from ultralytics import YOLO
import shutil 
import os

# 1. Initialize the API and the Model
app = FastAPI(title="VisionFlow API")
model = YOLO('yolo11n.pt')

@app.get("/")
def read_root():
    return{"message": "VisionFlow ML API is awake!"}

# 2. Create the endpoint that listens for images
@app.post("/predict")
async def predict_inventory(file: UploadFile = File(...)):

    # 3. Save the uploaded image temporarily so YOLO can read it
    temp_file_path = f"temp_{file.filename}"
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer) # Save the uploaded file to disk, so we can pass the file path to YOLO
                                              # copy data from file-like object fsrc to file-like object fdst
        # Run the YOLO Model
        results = model(temp_file_path) # returns a list

        # The Counting Logic (With 50% Confidence Threshold added)
        inventory = {}
        for r in results:
            for box in r.boxes:
                confidence = float(box.conf[0])

                # ONly count items the Model is more 50% sure about
                if confidence >= 0.5:
                    class_id = int(box.cls[0])
                    class_name = model.names[class_id]

                    if class_name in inventory:
                        inventory[class_name] += 1
                    else:
                        inventory[class_name] = 1

    # Clean up the temporary file
    os.remove(temp_file_path)

    # Return the clean dictionary as a web response 
    return{"status": "success", "inventory": inventory}