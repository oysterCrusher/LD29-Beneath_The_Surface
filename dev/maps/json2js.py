import json

map01 = {'name': '01', 'players': [[0,2,8,2]] }
map02 = {'name': '02', 'players': [[4,0,6,8]] }
map03 = {'name': '03', 'players': [[7,4,0,5]] }
map04 = {'name': '04', 'players': [[10,4,0,4]] }
map05 = {'name': '05', 'players': [[7,7,2,7]] }
map06 = {'name': '06', 'players': [[0,1,10,5]] }

maps = [map01, map02, map03, map04, map05, map06]

output_file = '../js/maps.js'

js_head = 'ld.maps = [\n'
js_tail = '];'

outfile = open(output_file, 'w')
outfile.write(js_head)

out_map_data = []

for file in maps:
	file_data = open(file['name'] + '.json', 'r')
	data = json.load(file_data)
	file_data.close()
	w = data['layers'][1]['width']
	h = data['layers'][0]['height']
	above_map_array = []
	below_map_array = []
	blocks_array = []
	cracks_array = []
	for y in range(0, h):
		above_row_data = []
		below_row_data = []
		for x in range(0, w):
			ta = data['layers'][1]['data'][x + y * w]
			tb = data['layers'][0]['data'][x + y * w]
			if (tb == 9):  # Block
				blocks_array.append([x,y,0])
				tb = 7
			elif (tb == 10):
				blocks_array.append([x,y,1])
				tb = 7
			elif (tb == 11):
				blocks_array.append([x,y,2])
				tb = 7
			elif (tb == 12):
				blocks_array.append([x,y,3])
				tb = 7
			above_row_data.append(ta)
			below_row_data.append(tb)
		above_map_array.append(above_row_data)
		below_map_array.append(below_row_data)
		
	comma = ','
	if (file['name'] == maps[-1]['name']):
		comma = ''
	outfile.write('{\nabove:\n' + str(above_map_array) + ',\nbelow:\n' + str(below_map_array) + ',\nblocks:\n' + str(blocks_array) + ',\npersons:\n' + str(file['players']) + '\n}' + comma + '\n')

outfile.write(js_tail)
outfile.close()