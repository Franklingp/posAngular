'use strict'
// Modelo de dato para clientes

export class ClientModel{

	constructor( 
		public name: string,
		public surname: string,
		public identification: number,
		public company: boolean,
		public registryId: [string]
		){ }
}

