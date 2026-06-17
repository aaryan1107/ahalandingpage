# AHA 3D model assets

Put exported car models here as `.glb` files.

Current mapped file:

- `tata-nexon.glb` renders for Tata + Nexon in the Streamlit hero.

Recommended Blender export:

- File > Export > glTF 2.0
- Format: `glTF Binary (.glb)`
- Apply transforms before export if the car appears rotated or tiny.
- Keep the file optimized for web if possible.

To add more models, add the file here and update `MODEL_FILES` in `components/dashboard_hero.py`.
