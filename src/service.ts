const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore({
    projectId: `${process.env.PROJECT_ID}`,
    credentials: {
        private_key: `${process.env.PRIVATE_KEY}`,
        client_email: `${process.env.CLIENT_EMAIL}`
    }
});

export interface Product {
    serialNumber: string;
    modelNumber: string;
    name: string;
    price: number;
    createdAt?: Date
}

export class DataService {

    /**
     * Constructor
     *
     * @class DataService
     * @constructor
     */
    constructor() {
    }

    public saveProduct(category: string, product: Product): Promise<void> {
        const document = firestore.doc(`products/${product.serialNumber}`);
        if (!product.createdAt) {
            product.createdAt = new Date();
        }
        return document.set(product)
            .then((done: any) => this.addProductToCategory(category, product.serialNumber));
    }

    public addProductToCategory(category: string, serialNumber: string): Promise<any> {
        let doc = firestore.doc(`product_categories/${category}`);
        return doc.get().then((snapshot: any) => {
            if (snapshot.exists) {
                return doc.update(
                    'products', Firestore.FieldValue.arrayUnion(serialNumber)
                );
            } else {
                return doc.set({
                    'products': [serialNumber]
                });
            }
        });
    }

    public removeCategory(category: string): Promise<any> {
        return firestore.doc(`product_categories/${category}`).delete();
    }

    public getCategoriesOfProduct(category: string): Promise<string[]> {
        console.log('categories of product', category);
        let collectionRef = firestore.collection('product_categories');
        return collectionRef.where('products', 'array-contains', category).get().then((querySnapshot: any) => {
            let ret: string[] = [];
            querySnapshot.forEach((documentSnapshot: any) => {
                ret.push(documentSnapshot.ref.id);
            });
            return ret;
        });
    };

}