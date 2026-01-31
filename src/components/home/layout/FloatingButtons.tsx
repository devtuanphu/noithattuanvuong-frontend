import { getHotlineConfig } from "@/lib/server/pages";
import FloatingButtonsClient from "./FloatingButtonsClient";

export default async function FloatingButtons() {
  const hotlineConfig = await getHotlineConfig();
  
  return <FloatingButtonsClient hotlineConfig={hotlineConfig} />;
}
