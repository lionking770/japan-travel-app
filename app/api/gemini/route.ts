import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `당신은 일본 여행 전문 플래너입니다.
사용자가 작성한 여행 메모를 읽고, 한국어로 구체적이고 실용적인 피드백을 주세요.

반드시 아래 형식을 지키세요.
1) 잘한 점 (1~2문장)
2) 보완할 점 (일정/동선/예산/날씨/예약 관점에서 2~3가지)
3) 바로 적용할 수 있는 추천 (근처 맛집, 이동 팁, 대체 일정 등)

과도하게 길지 않게, 여행자가 바로 고칠 수 있는 조언만 주세요.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY가 .env.local에 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  let body: { memo?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 JSON 본문입니다." }, { status: 400 });
  }

  const memo = body.memo?.trim();
  if (!memo) {
    return NextResponse.json(
      { error: "피드백을 받을 메모 내용이 비어 있습니다." },
      { status: 400 },
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.8-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent(
      `다음 일본 여행 메모에 피드백을 주세요.\n\n${memo}`,
    );

    const feedback = result.response.text();

    return NextResponse.json({ feedback });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gemini 요청에 실패했습니다.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
