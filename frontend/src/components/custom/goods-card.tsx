
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { goodsCardType } from "@/types/goodscard"


interface GoodsCard {
    goodscard: goodsCardType
}

export function GoodsCard({ goodscard }: GoodsCard) {

    return (
        <button
            key={goodscard.id}
            className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                goodscard.selected && "bg-muted"
            )}
        >
            <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                    <div className="flex items-center gap-2">
                        <div className="font-semibold line-clamp-2">{goodscard.name}</div>
                    </div>
                </div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
                {goodscard.text.substring(0, 300)}
            </div>
            <Badge>
                {goodscard.labels}
            </Badge>
        </button>
    )
}
