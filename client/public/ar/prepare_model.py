import os
import sys
from PIL import Image

src_dir = r"c:\Project AR\cvjxb8n6buo0-tajmahal"
tex_src = os.path.join(src_dir, "tex")
out_dir = r"c:\Project AR\WebAR\models"
tex_out = os.path.join(out_dir, "tex")

os.makedirs(tex_out, exist_ok=True)

# 1. Convert PSD / JPG textures to PNG for web compatibility
texture_map = {}
for fname in os.listdir(tex_src):
    in_path = os.path.join(tex_src, fname)
    if not os.path.isfile(in_path):
        continue
    base_name = os.path.splitext(fname)[0]
    out_name = base_name.replace(" ", "_").replace("copie", "").strip("_") + ".png"
    out_path = os.path.join(tex_out, out_name)
    try:
        with Image.open(in_path) as im:
            # Convert to RGB if needed
            if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
                im.convert('RGBA').save(out_path, 'PNG', optimize=True)
            else:
                im.convert('RGB').save(out_path, 'PNG', optimize=True)
        print(f"Converted: {fname} -> {out_name}")
        texture_map[fname] = f"tex/{out_name}"
    except Exception as e:
        print(f"Error converting {fname}: {e}")

# 2. Create tajmahal.mtl with proper material bindings
mtl_content = f"""# Taj Mahal Materials for WebAR

newmtl Marbre_1
Ka 1.0 1.0 1.0
Kd 0.95 0.95 0.95
Ks 0.2 0.2 0.2
Ns 50.0
d 1.0
illum 2
map_Kd {texture_map.get('MarbleTilesWall0065_1_L copie.psd', 'tex/MarbleTilesWall0065_1_L.png')}

newmtl Cuivre_verdi
Ka 0.6 0.7 0.6
Kd 0.45 0.65 0.55
Ks 0.4 0.4 0.4
Ns 30.0
d 1.0
illum 2

newmtl Socle_rotonde
Ka 1.0 1.0 1.0
Kd 0.9 0.9 0.9
Ks 0.1 0.1 0.1
Ns 20.0
d 1.0
illum 2
map_Kd {texture_map.get('PlasterColoured0059_3_L copie.jpg', 'tex/PlasterColoured0059_3_L.png')}

newmtl frise_dome
Ka 1.0 1.0 1.0
Kd 0.9 0.9 0.9
Ks 0.2 0.2 0.2
Ns 40.0
d 1.0
illum 2
map_Kd {texture_map.get('Frise dome.psd', 'tex/Frise_dome.png')}

newmtl Frise_socle
Ka 1.0 1.0 1.0
Kd 0.9 0.9 0.9
Ks 0.2 0.2 0.2
Ns 40.0
d 1.0
illum 2
map_Kd {texture_map.get('Frise dome socle.psd', 'tex/Frise_dome_socle.png')}

newmtl BP
Ka 0.8 0.8 0.8
Kd 0.6 0.6 0.6
Ks 0.1 0.1 0.1
Ns 10.0
d 1.0
illum 2
map_Kd {texture_map.get('AsphaltDamaged0062_3_L.jpg', 'tex/AsphaltDamaged0062_3_L.png')}

newmtl facade_2
Ka 1.0 1.0 1.0
Kd 0.95 0.95 0.95
Ks 0.2 0.2 0.2
Ns 30.0
d 1.0
illum 2
map_Kd {texture_map.get('Taj facade 2 tex.psd', 'tex/Taj_facade_2_tex.png')}
"""

mtl_path = os.path.join(out_dir, "tajmahal.mtl")
with open(mtl_path, "w", encoding="utf-8") as f:
    f.write(mtl_content)
print("Created tajmahal.mtl")

# 3. Create modified tajmahal.obj that references tajmahal.mtl
obj_src = os.path.join(src_dir, "tajmahal.obj")
obj_dst = os.path.join(out_dir, "tajmahal.obj")

print("Writing tajmahal.obj with mtllib...")
with open(obj_src, "r", encoding="utf-8", errors="ignore") as f_in, open(obj_dst, "w", encoding="utf-8") as f_out:
    f_out.write("mtllib tajmahal.mtl\n")
    for line in f_in:
        f_out.write(line)

print("OBJ preparation complete!")
