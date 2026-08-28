import os
import sys

src_obj = r"c:\Project AR\WebAR\models\tajmahal.obj"
baked_obj = r"c:\Project AR\WebAR\models\tajmahal_baked.obj"

# 1. Read all vertices to find exact bounding box
min_x, max_x = float('inf'), float('-inf')
min_y, max_y = float('inf'), float('-inf')
min_z, max_z = float('inf'), float('-inf')

with open(src_obj, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if line.startswith('v '):
            parts = line.strip().split()
            x, y, z = float(parts[1]), float(parts[2]), float(parts[3])
            min_x, max_x = min(min_x, x), max(max_x, x)
            min_y, max_y = min(min_y, y), max(max_y, y)
            min_z, max_z = min(min_z, z), max(max_z, z)

size_x = max_x - min_x
size_y = max_y - min_y
size_z = max_z - min_z
max_dim = max(size_x, size_z) # ~659 units

# Target size: 1.2 meters wide on real floor
target_size = 1.2
scale_factor = target_size / max_dim

center_x = (min_x + max_x) / 2.0
center_z = (min_z + max_z) / 2.0
base_y = min_y # Ground level

print(f"Original Bounds: X[{min_x:.2f}, {max_x:.2f}], Y[{min_y:.2f}, {max_y:.2f}], Z[{min_z:.2f}, {max_z:.2f}]")
print(f"Scale Factor: {scale_factor:.6f} -> Target Width: {target_size}m")

# 2. Write baked OBJ where vertices are centered on X/Z and grounded at Y = 0.0
with open(src_obj, 'r', encoding='utf-8', errors='ignore') as f_in, open(baked_obj, 'w', encoding='utf-8') as f_out:
    for line in f_in:
        if line.startswith('v '):
            parts = line.strip().split()
            x = (float(parts[1]) - center_x) * scale_factor
            y = (float(parts[2]) - base_y) * scale_factor
            z = (float(parts[3]) - center_z) * scale_factor
            f_out.write(f"v {x:.6f} {y:.6f} {z:.6f}\n")
        elif line.startswith('vn '):
            # Normals remain unchanged
            f_out.write(line)
        elif line.startswith('vt '):
            # UVs remain unchanged
            f_out.write(line)
        else:
            f_out.write(line)

print("Baked OBJ written successfully!")
