import { DemoProductsContainer } from "@/features/products/containers/demo-products.container";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Produk"
}

export default function ProductDemo(){
    return <DemoProductsContainer />
}