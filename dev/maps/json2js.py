import json

map_json_files = ['test01']

output_file = '../js/maps.js'

js_head = 'ld.maps = [\n'
js_tail = '];'

outfile = open(output_file, 'w')
outfile.write(js_head)

for file in map_json_files:
	file_data = open(file + '.json', 'r')
	data = json.load(file_data)
	file_data.close()
	w = data['layers'][1]['width']
	h = data['layers'][0]['height']
	above_map_array = []
	below_map_array = []
	blocks_array = []
	for y in range(0, h):
		above_row_data = []
		below_row_data = []
		for x in range(0, w):
			above_row_data.append(data['layers'][1]['data'][x + y * w])
			if (data['layers'][0]['data'][x + y * w] == 8):
				blocks_array.append([x,y])
				below_row_data.append(5)
			else:				
				below_row_data.append(data['layers'][0]['data'][x + y * w])
		above_map_array.append(above_row_data)
		below_map_array.append(below_row_data)
		
outfile.write('{\nabove:\n' + str(above_map_array) + ',\nbelow:\n' + str(below_map_array) + ',\nblocks:\n' + str(blocks_array) + '\n}\n')

outfile.write(js_tail)
outfile.close()