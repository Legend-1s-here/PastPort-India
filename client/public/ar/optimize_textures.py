import os
from PIL import Image

tex_dir = r"c:\Project AR\WebAR\models\tex"
for fname in os.listdir(tex_dir):
    fpath = os.path.join(tex_dir, fname)
    if not os.path.isfile(fpath) or not fname.endswith('.png'):
        continue
    with Image.open(fpath) as im:
        w, h = im.size
        if w > 1024 or h > 1024:
            ratio = min(1024 / w, 1024 / h)
            new_size = (int(w * ratio), int(h * ratio))
            im_resized = im.resize(new_size, Image.Resampling.LANCZOS)
            im_resized.save(fpath, "PNG", optimize=True)
            print(f"Resized {fname} from {w}x{h} -> {new_size}")
print("Texture optimization complete!")
