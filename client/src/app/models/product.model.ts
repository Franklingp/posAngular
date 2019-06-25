'use strict'

// Modelo de producto para el inventario

export class ProductModel{

	//Modelo que continene todos los datos de un producto

	constructor(
		public name: string,
		public brand: string,
		public price: number,
		public description: string,
		public category: string,
		public quantity: number,
		//public cost: number,
		public enabled: boolean,
		public registryId: [string]
		){}
}
