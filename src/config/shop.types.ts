export interface Shop {
    id: number,
    name: string,
    address: string,
    longitude: string,
    lattitude: string,
    createdAt: Date,
    email: string,
    Shops_Phone: {
        phone1: string,
        phone1_whatsapp: boolean,
        phone1_call: boolean,
        phone1_message: boolean,
        phone2: string,
        phone2_whatsapp: boolean,
        phone2_call: boolean,
        phone2_message: boolean,
        phone3: string,
        phone3_whatsapp: boolean,
        phone3_call: boolean,
        phone3_message: boolean,
    },
    Customer : {
        id: number,
        name?: string
    },
    Route: {
        id: number,
        label?: string
    },
    User: {
        id: number,
        name?: string
    },
    Shoptypes: {
        id: number,
        label?: string
    },
    Shops_Updates: {
        timestamp: Date,
        User: {
            id: number,
            name: string
        }
    }[],
    Shops_Images: {
        img1: string,
        img2: string,
        img3: string,
        img4: string,
        img5: string,
    }
}

export interface data_consts {
    customers: {
        id: number,
        name: string
    }[],
    routes: {
        id: number,
        label: string
    }[],
    shoptypes: {
        id: number,
        label: string
    }[]
}