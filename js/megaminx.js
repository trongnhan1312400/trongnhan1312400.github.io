/*

@author: nguyen trong nhan
@version: 1.0

This source provide the methods and parameter to create and manipulate a megaminx

*/

var lookupTable = 
[
	{
		rotateFace: [5, 3, 4, 3, 3, 3, 2, 3, 1, 3],
		axis: new THREE.Vector3(0, 0, 0)
	},
	{
		rotateFace: [10, 1, 9, 5, 5, 2, 0, 3, 2, 4],
		axis: new THREE.Vector3(0, 0, 0)
	},
	{
		rotateFace: [11, 1, 10, 5, 1, 2, 0, 2, 3, 4],
		axis: new THREE.Vector3(0, 0, 0)
	},
	{
		rotateFace: [7, 1, 11, 5, 2, 2, 0, 1, 4, 4],
		axis: new THREE.Vector3(0, 0, 0)
	},
	{
		rotateFace: [8, 1, 7, 5, 3, 2, 0, 5, 5, 4],
		axis: new THREE.Vector3(0, 0, 0)
	},
	{
		rotateFace: [9, 1, 8, 5, 4, 2, 0, 4, 1, 4],
		axis: new THREE.Vector3(0, 0, 0)
	},
	{
		rotateFace: [7, 3, 8, 3, 9, 3, 10, 3, 11, 3],
		axis: new THREE.Vector3(0, 0, 0)
	},
	{
		rotateFace: [3, 1, 4, 5, 8, 2, 6, 3, 11, 4],
		axis: new THREE.Vector3(0, 0, 0)
	},
	{
		rotateFace: [4, 1, 5, 5, 9, 2, 6, 4, 7, 4],
		axis: new THREE.Vector3(0, 0, 0)
	},
	{
		rotateFace: [5, 1, 1, 5, 10, 2, 6, 5, 8, 4],
		axis: new THREE.Vector3(0, 0, 0)
	},
	{
		rotateFace: [1, 1, 2, 5, 11, 2, 6, 1, 9, 4],
		axis: new THREE.Vector3(0, 0, 0)
	},
	{
		rotateFace: [2, 1, 3, 5, 7, 2, 6, 2, 10, 4],
		axis: new THREE.Vector3(0, 0, 0)
	}
];

var faceColors = 
[  
	0xaa0000, 0x00ff00, 0x0000ff, 
	0xffff00, 0x00ffff, 0xff00ff, 
	0xffffff, 0x727272, 0x62361c, 
	0xf86b00, 0x026400, 0x52007d  
];

function createRhombus(A, B, C, D, color, face)
{
	var geo = new THREE.Geometry();
	geo.vertices.push(A, B, C, D);
	geo.faces.push( new THREE.Face3(2,1,0));
    geo.faces.push( new THREE.Face3(0,3,2));
    var edge = new THREE.EdgesGeometry(geo);
    var eM = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 10 } );
    var line = new THREE.LineSegments(edge, eM);
    var mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide}));
    mesh.add(line);
    mesh.belongingFace = face;
    return mesh;
};

function createTriangle(A, B, C, color, face)
{
	var geo = new THREE.Geometry();
	geo.vertices.push(A, B, C);
	geo.faces.push( new THREE.Face3(1,0,2));
    var edge = new THREE.EdgesGeometry(geo);
    var eM = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 10 } );
    var line = new THREE.LineSegments(edge, eM);
    var mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide}));
    mesh.add(line);
    mesh.belongingFace = face;
    return mesh;
};

function createPentagon(A, B, C, D, E, color, face)
{
	var geo = new THREE.Geometry();
	geo.vertices.push(A, B, C, D, E);
	geo.faces.push( new THREE.Face3(2,1,0));
    geo.faces.push( new THREE.Face3(0,3,2));
    geo.faces.push( new THREE.Face3(0,4,3));
    var edge = new THREE.EdgesGeometry(geo);
    var eM = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 10 } );
    var line = new THREE.LineSegments(edge, eM);
    var mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide}));
    mesh.add(line);
    mesh.belongingFace = face;
    return mesh;
};

function createFace(size, color, face) 
{
	var A = new THREE.Vector3(0, size, 0);
	var E = new THREE.Vector3(size * Math.cos(162 * DEG_TO_RAD), size * Math.sin(162 * DEG_TO_RAD), 0);
	var D = new THREE.Vector3(size * Math.cos(234 * DEG_TO_RAD), size * Math.sin(234 * DEG_TO_RAD), 0);
	var C = new THREE.Vector3(size * Math.cos(306 * DEG_TO_RAD), size * Math.sin(306 * DEG_TO_RAD), 0);
	var B = new THREE.Vector3(size * Math.cos(18 * DEG_TO_RAD), size * Math.sin(18 * DEG_TO_RAD), 0);

	var mAB = calcMib(A, B);
	var mBC = calcMib(B, C);
	var mCD = calcMib(C, D);
	var mDE = calcMib(D, E);
	var mEA = calcMib(E, A);

	var r = size * (1 - 2 * (Math.cos(54 * DEG_TO_RAD) * Math.cos(54 * DEG_TO_RAD)));
	var lA = new THREE.Vector3(0, r, 0);
	var lE = new THREE.Vector3(r * Math.cos(162 * DEG_TO_RAD), r * Math.sin(162 * DEG_TO_RAD), 0);
	var lD = new THREE.Vector3(r * Math.cos(234 * DEG_TO_RAD), r * Math.sin(234 * DEG_TO_RAD), 0);
	var lC = new THREE.Vector3(r * Math.cos(306 * DEG_TO_RAD), r * Math.sin(306 * DEG_TO_RAD), 0);
	var lB = new THREE.Vector3(r * Math.cos(18 * DEG_TO_RAD), r * Math.sin(18 * DEG_TO_RAD), 0);

	var multiCells = [];

	multiCells.push({flag: [5, 1], mesh: createRhombus(A, mAB, lA, mEA, color, face), color: color});

 	multiCells.push({flag: [1], mesh: createTriangle(mAB, lB, lA, color, face), color: color});

  	multiCells.push({flag: [1, 2], mesh: createRhombus(B, mBC, lB, mAB, color, face), color: color});

  	multiCells.push({flag: [2], mesh: createTriangle(mBC, lC, lB, color, face), color: color});

  	multiCells.push({flag: [2, 3], mesh: createRhombus(C, mCD, lC, mBC, color, face), color: color});

  	multiCells.push({flag: [3], mesh: createTriangle(mCD, lD, lC, color, face), color: color});

  	multiCells.push({flag: [3, 4], mesh: createRhombus(D, mDE, lD, mCD, color, face), color: color});

  	multiCells.push({flag: [4], mesh: createTriangle(mDE, lE, lD, color, face), color: color});

  	multiCells.push({flag: [4, 5], mesh: createRhombus(E, mEA, lE, mDE, color, face), color: color});

  	multiCells.push({flag: [5], mesh: createTriangle(mEA, lA, lE, color, face), color: color});

  	multiCells.push({flag: [0], mesh: createPentagon(lA, lB, lC, lD, lE, color, face), color: color});

	return multiCells;
};

function createMegaminx(size)
{
	var iR = computeInsideR(size);
	var corner = Math.acos(-1 / Math.sqrt(5));
	var point = new THREE.Vector3(0, -iR, 0);
	var result = [];

	//Down part
	var multiCells1 = createFace(size, faceColors[0], 0);
		
	rotateMultiCell(multiCells1, new THREE.Vector3(1.0, 0, 0), -90 * DEG_TO_RAD, 'YXZ');

	translateMultiCell(multiCells1, point);

	lookupTable[0].axis.copy(point);
	lookupTable[0].axis.normalize();
	result.push(multiCells1);

	point = getRotatePointX(point, -(Math.PI - corner));

	var multiCells2 = createFace(size, faceColors[1], 1);

	rotateMultiCell(multiCells2, new THREE.Vector3(1.0, 0, 0), corner - Math.PI / 2, 'YXZ');
	translateMultiCell(multiCells2, point);

	lookupTable[1].axis.copy(point);
	lookupTable[1].axis.normalize();
	result.push(multiCells2);

	var multiCells3 = createFace(size, faceColors[2], 2);
	rotateMultiCell(multiCells3, new THREE.Vector3(0, 1.0, 0), 72 * DEG_TO_RAD, 'YXZ');
	rotateMultiCell(multiCells3, new THREE.Vector3(1.0, 0, 0), corner - Math.PI / 2, 'YXZ');

	point = getRotatePointY(point, 72 * DEG_TO_RAD);
	translateMultiCell(multiCells3, point);

	lookupTable[2].axis.copy(point);
	lookupTable[2].axis.normalize();
	result.push(multiCells3);

	var multiCells4 = createFace(size, faceColors[3], 3);

	rotateMultiCell(multiCells4, new THREE.Vector3(0, 1.0, 0), 2 * 72 * DEG_TO_RAD, 'YXZ');
	rotateMultiCell(multiCells4, new THREE.Vector3(1.0, 0, 0), corner - Math.PI / 2, 'YXZ');

	point = getRotatePointY(point, 72 * DEG_TO_RAD);
	translateMultiCell(multiCells4, point);

	lookupTable[3].axis.copy(point);
	lookupTable[3].axis.normalize();
	result.push(multiCells4);

	var multiCells5 = createFace(size, faceColors[4], 4);

	rotateMultiCell(multiCells5, new THREE.Vector3(0, 1.0, 0), 3 * 72 * DEG_TO_RAD, 'YXZ');
	rotateMultiCell(multiCells5, new THREE.Vector3(1.0, 0, 0), corner - Math.PI / 2, 'YXZ');

	point = getRotatePointY(point, 72 * DEG_TO_RAD);
	translateMultiCell(multiCells5, point);

	lookupTable[4].axis.copy(point);
	lookupTable[4].axis.normalize();
	result.push(multiCells5);

	var multiCells6 = createFace(size, faceColors[5], 5);

	rotateMultiCell(multiCells6, new THREE.Vector3(0, 1.0, 0), 4 * 72 * DEG_TO_RAD, 'YXZ');
	rotateMultiCell(multiCells6, new THREE.Vector3(1.0, 0, 0), corner - Math.PI / 2, 'YXZ');

	point = getRotatePointY(point, 72 * DEG_TO_RAD);
	translateMultiCell(multiCells6, point);

	lookupTable[5].axis.copy(point);
	lookupTable[5].axis.normalize();
	result.push(multiCells6);

	//Up Part
	point = new THREE.Vector3(0, iR, 0);
	var multiCells7 = createFace(size, faceColors[6], 6);

	rotateMultiCell(multiCells7, new THREE.Vector3(1.0, 0, 0), 90 * DEG_TO_RAD, 'YXZ');
	translateMultiCell(multiCells7, point);

	lookupTable[6].axis.copy(point);
	lookupTable[6].axis.normalize();
	result.push(multiCells7);

	point = getRotatePointX(point, -(Math.PI - corner));
	var rotateX = Math.PI - (Math.PI / 2 - corner);
	var multiCells8 = createFace(size, faceColors[7], 7);

	rotateMultiCell(multiCells8, new THREE.Vector3(1.0, 0, 0), rotateX, 'YXZ');
	translateMultiCell(multiCells8, point);

	lookupTable[7].axis.copy(point);
	lookupTable[7].axis.normalize();
	result.push(multiCells8);

	var multiCells9 = createFace(size, faceColors[8], 8);
			
	rotateMultiCell(multiCells9, new THREE.Vector3(0, 1.0, 0), 72 * DEG_TO_RAD, 'YXZ');
	rotateMultiCell(multiCells9, new THREE.Vector3(1.0, 0, 0), rotateX, 'YXZ');

	point = getRotatePointY(point, 72 * DEG_TO_RAD);
	translateMultiCell(multiCells9, point);

	lookupTable[8].axis.copy(point);
	lookupTable[8].axis.normalize();
	result.push(multiCells9);

	var multiCells10 = createFace(size, faceColors[9], 9);

	rotateMultiCell(multiCells10, new THREE.Vector3(0, 1.0, 0), 2 * 72 * DEG_TO_RAD, 'YXZ');
	rotateMultiCell(multiCells10, new THREE.Vector3(1.0, 0, 0), rotateX, 'YXZ');

	point = getRotatePointY(point, 72 * DEG_TO_RAD);
	translateMultiCell(multiCells10, point);

	lookupTable[9].axis.copy(point);
	lookupTable[9].axis.normalize();
	result.push(multiCells10);

	var multiCells11 = createFace(size, faceColors[10], 10);
	rotateMultiCell(multiCells11, new THREE.Vector3(0, 1.0, 0), 3 * 72 * DEG_TO_RAD, 'YXZ');
	rotateMultiCell(multiCells11, new THREE.Vector3(1.0, 0, 0), rotateX, 'YXZ');

	point = getRotatePointY(point, 72 * DEG_TO_RAD);
	translateMultiCell(multiCells11, point);

	lookupTable[10].axis.copy(point);
	lookupTable[10].axis.normalize();
	result.push(multiCells11);
				
	var multiCells12 = createFace(size, faceColors[11], 11);

	rotateMultiCell(multiCells12, new THREE.Vector3(0, 1.0, 0), 4 * 72 * DEG_TO_RAD, 'YXZ');
	rotateMultiCell(multiCells12, new THREE.Vector3(1.0, 0, 0), rotateX, 'YXZ');

	point = getRotatePointY(point, 72 * DEG_TO_RAD);
	translateMultiCell(multiCells12, point);

	lookupTable[11].axis.copy(point);
	lookupTable[11].axis.normalize();
	result.push(multiCells12);

	return result;
};

function findCellIndexFromFlag(megaminx, face, flag)
{
	var cells = [];

	if (face < 0 || face > 11)
	{
		return cells;
	}

	var temp = megaminx[face];

	for (var i = 0; i < temp.length; i++)
	{
		for (var j = 0; j < temp[i].flag.length; j++)
		{
			if (temp[i].flag[j] === flag)
			{
				cells.push({face: face, index: i});
				break;
			}
		}
	}

	if (flag === 5)
	{
		var t = cells[0].index;
		cells[0].index = cells[2].index;
		cells[2].index = t;

		t = cells[0].index;
		cells[0].index = cells[1].index;
		cells[1].index = t;
	}

	return cells;
};

function getObjFromCellsIndex(megaminx, cells)
{
	var obj = new THREE.Group();

	for (var i = 0; i < cells.length; i++)
	{
		obj.add(megaminx[cells[i].face][cells[i].index].mesh);
	}

	return obj;
};

function removeCellsFromObj(megaminx, cells, obj)
{
	for (var i = 0; i < cells.length; i++)
	{
		obj.remove(megaminx[cells[i].face][cells[i].index].mesh);
	}
};

function getRotateCellsIndex(megaminx, face)
{
	var cells = [];
				
	if (face < 0 || face > 11)
	{
		return cells;
	}
				
	var index = lookupTable[face].rotateFace;

	for (var i = 0; i < megaminx[face].length; i++)
	{
		cells.push({face: face, index: i});
	}

	var addCellIndex = function(arrayCell)
	{
		for (var i = 0; i < arrayCell.length; i++)
		{
			cells.push(arrayCell[i]);
		}
	};

	for (var i = 0; i < index.length / 2; i++)
	{
		addCellIndex(findCellIndexFromFlag(megaminx, index[2 * i], index[2 * i + 1]));
	}

	return cells;

};

function addMegaminxToSence(scene, megaminx)
{
	for (var i = 0; i < megaminx.length; i++)
	{
		for (var j = 0; j < megaminx[i].length; j++)
		{
			scene.add(megaminx[i][j].mesh);
		}
	}
};

function updateFace(megaminx, face, dir)
{
	var length = megaminx[face].length - 1;

	if (dir < 0)
	{
		var temp = megaminx[face][0].color;
		for (var i = 0; i < length; i += 2)
		{
			var tColor = megaminx[face][(i + 2) % length].color;
			megaminx[face][(i + 2) % length].color = temp;
			temp = tColor;
		}

		temp = megaminx[face][1].color;

		for (var i = 1; i < length; i += 2)
		{
			var tColor = megaminx[face][(i + 2) % length].color;
			megaminx[face][(i + 2) % length].color = temp;
			temp = tColor;
		}
	}
	else
	{
		var temp = megaminx[face][length - 2].color;
		for (var i = length - 2; i >= 0; i -= 2)
		{
 			var tColor = megaminx[face][(i - 2 + length) % length].color;
			megaminx[face][(i - 2 + length) % length].color = temp;
			temp = tColor;
		}

		temp = megaminx[face][length - 1].color;

		for (var i = length - 1; i >= 0; i -= 2)
		{
			var tColor = megaminx[face][(i - 2 + length) % length].color;
			megaminx[face][(i - 2 + length) % length].color = temp;
			temp = tColor;
		}
	}
};

function updateRotateCell(megaminx, face, dir)
{
	var index;

	if (face === 0 || face === 6)
	{
		updateFace(megaminx, face, -dir);
	}
	else
	{
		updateFace(megaminx, face, dir);
	}

	index = lookupTable[face].rotateFace;

	var cellsIndex = [];

	for (var i = 0; i < index.length / 2; i++)
	{
		var temp = findCellIndexFromFlag(megaminx, index[2 * i], index[2 * i + 1]);
					
		if (index[2 * i] === 0 || index[2 * i] === 6)
		{
			var t = {face: temp[0].face, index: temp[0].index};
			temp[0].face = temp[2].face;
			temp[0].index = temp[2].index;
			temp[2] = t;
		}

		cellsIndex.push(temp);
	}

	var length = cellsIndex.length;

	if (dir >= 0)
	{
		var temp = [];
					
		for (var i = 0; i < cellsIndex[0].length; i++)
		{
			var j = cellsIndex[0][i].face;
			var k = cellsIndex[0][i].index;
			temp.push(megaminx[j][k].color);
		}

		for (var i = 0; i < length; i += 1)
		{
			var indexI = (i + 1) % length;
			var tColor = [];

			for (var j = 0; j < cellsIndex[indexI].length; j++)
			{
				var k = cellsIndex[indexI][j].face;
				var m = cellsIndex[indexI][j].index;
				tColor.push(megaminx[k][m].color);
			}

			for (var j = 0; j < cellsIndex[indexI].length; j++)
			{
				var k = cellsIndex[indexI][j].face;
				var m = cellsIndex[indexI][j].index;
				megaminx[k][m].color = temp[j];
			}

			temp = tColor;
		}
	}
	else
	{
		var temp = [];
					
		for (var i = 0; i < cellsIndex[length - 1].length; i++)
		{
			var j = cellsIndex[length - 1][i].face;
			var k = cellsIndex[length - 1][i].index;
			temp.push(megaminx[j][k].color);
		}

		for (var i = length - 1; i >= 0; i -= 1)
		{
			var indexI = (i - 1 + length) % length;
			var tColor = [];

			for (var j = 0; j < cellsIndex[indexI].length; j++)
			{
				var k = cellsIndex[indexI][j].face;
				var m = cellsIndex[indexI][j].index;
				tColor.push(megaminx[k][m].color);
			}

			for (var j = 0; j < cellsIndex[indexI].length; j++)
			{
				var k = cellsIndex[indexI][j].face;
				var m = cellsIndex[indexI][j].index;
				megaminx[k][m].color = temp[j];
			}

			temp = tColor;
		}
	}
};

function updateMegaminx(megaminx)
{
	for (var i = 0; i < megaminx.length; i++)
	{
		for (var j = 0; j < megaminx[i].length; j++)
		{
			megaminx[i][j].mesh.material.color.setHex(megaminx[i][j].color);
			megaminx[i][j].mesh.material.update();
		}
	}
};