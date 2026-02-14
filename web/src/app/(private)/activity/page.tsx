import { ActivityTemplate } from "@/features/activity/activity.template";
import { Metadata } from "next";

export const metadata:Metadata = {
    title:"Aktivitas"
}

export default function ActivityPage(){
    return <ActivityTemplate mode="private" />
}