# AHA 3D model assets

Streamlit serves this folder at `/app/static/models/...`.

Current mapped files:

- `tata-nexon.glb` renders for Tata + Nexon.
- `tata_punch.glb` renders for Tata + Punch.
- `tata-safari.glb` is present, but not mapped yet because it does not render reliably in `model-viewer`.

Recommended Blender export:

- File > Export > glTF 2.0
- Format: `glTF Binary (.glb)`
- Apply transforms before export if the car appears rotated, tiny, or off-center.
- Keep files optimized for web where possible.

To add more models, place the `.glb` here and update `MODEL_FILES` in `components/dashboard_hero.py`.
