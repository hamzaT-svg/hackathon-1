import { orders, db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest, { params }: {
    params: {
        id: string;
    };
}) {
    const { id } = params;

    try {
        const deletedOrder = await db.delete(orders).where(eq(orders.id, id)).returning();

        return NextResponse.json({ deletedOrder });
    } catch (error) {
        return NextResponse.json({ message: (error as { message: string; }).message });
    }
}

