import json

map0 = {'name': 'test01', 'players': [[[3,10], [3,9], [3,8], [3,7], [3,6], [3,5], [3,4], [3,3], [4,3], [5,3], [6,3], [7,3], [8,3], [8,4], [8,5], [8,6], [8,7], [9,7], [10,7], [11,7], [12,7], [13,7], [14,7], [15,7], [16,7], [16,6], [16,5], [16,4], [16,3], [16,2], [16,1], [16,0], [16,-1]]] }

maps = [map0]

output_file = '../js/maps.js'

js_head = 'ld.maps = [\n'
js_tail = '];'

outfile = open(output_file, 'w')
outfile.write(js_head)

for file in maps:
	file_data = open(file['name'] + '.json', 'r')
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
		
	outfile.write('{\nabove:\n' + str(above_map_array) + ',\nbelow:\n' + str(below_map_array) + ',\nblocks:\n' + str(blocks_array) + ',\npersons:\n' + str(file['players']) + '\n}\n')

outfile.write(js_tail)
outfile.close()