export async function POST(request) {
    const body = await request.json();
    return Response.json({
        status: "ok",
        received: body
    });
}