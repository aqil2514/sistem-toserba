import { AssetsTemplate } from "@/features/assets/assets.template";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Aset Fisik",
}

export default function AssetsPage(){
    return <AssetsTemplate mode="private" />
}