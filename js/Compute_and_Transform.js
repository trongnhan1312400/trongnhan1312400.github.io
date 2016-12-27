/*

@author: nguyen trong nhan
@version: 1.0

Provide the methods to compute parameter and transform

*/


function calcMib(f, s)
{
	var mid = new THREE.Vector3((f.x + s.x) / 2, (f.y + s.y) / 2,(f.z + s.z) / 2);

	return mid;
};

function translate(object, vector)
{
	object.position.x += vector.x;
	object.position.y += vector.y;
	object.position.z += vector.z;
};

function translateMultiCell(cells, vector)
{
	for (var i = 0; i < cells.length; i++)
	{
		translate(cells[i].mesh, vector);
	}
};

function rotateMultiCell(cells, vector, radian, order)
{
	var axis = new THREE.Vector3();
	axis.copy(vector);
	axis.normalize();

	for (var i = 0; i < cells.length; i++)
	{
		cells[i].mesh.rotation.order = order;
		cells[i].mesh.rotateOnAxis(axis, radian);
	}
};

function computeSinCos(theta)
{
	var values = {cos: Math.cos(theta), sin: Math.sin(theta)};

	return values;
};

function getRotatePointX(point, theta)
{
	var scVal = computeSinCos(theta);
	var result = new THREE.Vector3(point.x, point.y * scVal.cos - point.z * scVal.sin
									, point.y * scVal.sin + point.z * scVal.cos);

	return result;
};

function getRotatePointY(point, theta)
{
	var scVal = computeSinCos(theta);
	var result = new THREE.Vector3(point.x * scVal.cos + point.z * scVal.sin, point.y
									, -point.x * scVal.sin + point.z * scVal.cos);

	return result;
};

function getRotatePointZ(point, theta)
{
	var scVal = computeSinCos(theta);
	var result = new THREE.Vector3(point.x * scVal.cos - point.y * scVal.sin
									, point.x * scVal.sin + point.y * scVal.cos, point.z);

	return result;
};

function computeEdge(size)
{
	return 2 * size * Math.cos(54 * DEG_TO_RAD);
};

function computeInsideR(size)
{
	return computeEdge(size) * 0.5 * Math.sqrt(2.5 + 1.1 * Math.sqrt(5));
};