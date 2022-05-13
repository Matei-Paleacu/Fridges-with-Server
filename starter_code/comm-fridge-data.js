let fridgeA = {
	name: "Parkdale fridge", // name of the fridge
	capacity: 45,
	contact_person: "Jane Doe",
	contact_phone: " (613) 722-8019",

	// Location of the fridge
	address: {
		street: "30 Rosemount Ave #2",
		postal_code: "K1Y 1P4",
		city: "Ottawa",
		province: "Ontario",
		country: "Canada",
	},

	items: {
		"almond_milk": {
				name: "Almond milk",
				quantity: 1,
				type: "dairy",
				img: "images/dairy/almond_milk.jpeg"
			},
			"whole_milk": {
					name: "Whole milk",
					quantity: 2,
					type: "dairy",
					img: "images/dairy/whole_milk.jpeg"
				},
			"salted_butter": {
					name: "Salted butter",
					quantity: 1,
					type: "dairy",
					img: "images/dairy/salted_butter.jpeg"
					},
			"grapes": {
					name: "Grapes",
					quantity: 2,
					type: "produce",
					img: "images/produce/grapes.jpeg"
					},
			"apples": {
					name: "Apples",
					quantity: 1,
					type: "produce",
					img: "images/produce/apples.jpeg"
				},
			"bananas": {
					name: "Bananas",
					quantity: 2,
					type: "produce",
					img: "images/produce/bananas.jpeg"
					},
			"spinach": {
					name: "Spinach",
					quantity: 1,
					type: "produce",
					img: "images/produce/spinach.jpeg"
					},
			"lettuce": {
					name: "Lettuce",
					quantity: 1,
					type: "produce",
					img: "images/produce/lettuce.jpeg"
					},
			"cauliflower": {
					name: "Cauliflower",
					quantity: 1,
					type: "produce",
					img: "images/produce/cauliflower.jpeg"
					},
			"cheerios": {
					name: "Cheerios",
					quantity: 1,
					type: "pantry",
					img: "images/pantry/cheerios.jpeg"
					},
			"crackers": {
					name: "Crackers",
					quantity: 4,
					type: "pantry",
					img: "images/pantry/crackers.jpeg"
					},
	}
};

let fridgeB = {
	name: "Morrison fridge", // name of the fridge
	capacity: 80,
	contact_person: "John Doe",
	contact_phone: "(613) 596-6229",

	// Location of the fridge
	address: {
		street: "3985-A Morrison Drive",
		postal_code: "K2H 7L1",
		city: "Ottawa",
		province: "Ontario",
		country: "Canada",
	},

	items: {
		"almond_milk": {
				name: "Almond milk",
				quantity: 1,
				type: "dairy",
				img: "images/dairy/almond_milk.jpeg"
			},
			"whole_milk": {
					name: "Whole milk",
					quantity: 2,
					type: "dairy",
					img: "images/dairy/whole_milk.jpeg"
				},
			"salted_butter": {
					name: "Salted butter",
					quantity: 1,
					type: "dairy",
					img: "images/dairy/salted_butter.jpeg"
					},
			"grapes": {
					name: "Grapes",
					quantity: 2,
					type: "produce",
					img: "images/produce/grapes.jpeg"
					},
			"apples": {
					name: "Apples",
					quantity: 1,
					type: "produce",
					img: "images/produce/apples.jpeg"
				},
			"bananas": {
					name: "Bananas",
					quantity: 2,
					type: "produce",
					img: "images/produce/bananas.jpeg"
					},
			"spinach": {
					name: "Spinach",
					quantity: 1,
					type: "produce",
					img: "images/produce/spinach.jpeg"
					},
			"lettuce": {
					name: "Lettuce",
					quantity: 1,
					type: "produce",
					img: "images/produce/lettuce.jpeg"
					},
			"cauliflower": {
					name: "Cauliflower",
					quantity: 1,
					type: "produce",
					img: "images/produce/cauliflower.jpeg"
					},
			"cheerios": {
					name: "Cheerios",
					quantity: 1,
					type: "pantry",
					img: "images/pantry/cheerios.jpeg"
					},
			"crackers": {
					name: "Crackers",
					quantity: 4,
					type: "pantry",
					img: "images/pantry/crackers.jpeg"
					},
	}
};

let fridgeC = {
	name: "Somerset fridge", // name of the fridge
	capacity: 65,
	contact_person: "Mary Doe",
	contact_phone: "(613) 238-8210",

	// Location of the fridge
	address: {
		street: "55 Eccles Street",
		postal_code: "K1R 6S3",
		city: "Ottawa",
		province: "Ontario",
		country: "Canada",
	},

	items: {
		"almond_milk": {
				name: "Almond milk",
				quantity: 1,
				type: "dairy",
				img: "images/dairy/almond_milk.jpeg"
			},
			"whole_milk": {
					name: "Whole milk",
					quantity: 2,
					type: "dairy",
					img: "images/dairy/whole_milk.jpeg"
				},
			"salted_butter": {
					name: "Salted butter",
					quantity: 1,
					type: "dairy",
					img: "images/dairy/salted_butter.jpeg"
					},
			"grapes": {
					name: "Grapes",
					quantity: 2,
					type: "produce",
					img: "images/produce/grapes.jpeg"
					},
			"apples": {
					name: "Apples",
					quantity: 1,
					type: "produce",
					img: "images/produce/apples.jpeg"
				},
			"bananas": {
					name: "Bananas",
					quantity: 2,
					type: "produce",
					img: "images/produce/bananas.jpeg"
					},
			"spinach": {
					name: "Spinach",
					quantity: 1,
					type: "produce",
					img: "images/produce/spinach.jpeg"
					},
			"lettuce": {
					name: "Lettuce",
					quantity: 1,
					type: "produce",
					img: "images/produce/lettuce.jpeg"
					},
			"cauliflower": {
					name: "Cauliflower",
					quantity: 1,
					type: "produce",
					img: "images/produce/cauliflower.jpeg"
					},
			"cheerios": {
					name: "Cheerios",
					quantity: 1,
					type: "pantry",
					img: "images/pantry/cheerios.jpeg"
					},
			"crackers": {
					name: "Crackers",
					quantity: 4,
					type: "pantry",
					img: "images/pantry/crackers.jpeg"
					},
	}
};
let fridges = [fridgeA, fridgeB, fridgeC];

// categories: dairy, pantry, meat and seafood, produce, bakery, frozen
