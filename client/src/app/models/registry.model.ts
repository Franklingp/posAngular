//Model de dato para los registros

export class RegistryModel {

	constructor(
		public client: {
			id: string,
			name: string,
			surname: string,
			identification: number
		},
		public date: string,
		public total_price: number,
		public products:[
			{
				id: string,
				name: string,
				brand: string,
				price: number,
				quantity: number,
			}
		]	
		){ }
}
