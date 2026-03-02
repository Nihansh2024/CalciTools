import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const zai = await ZAI.create()

    // Build conversation history
    const messages = [
      {
        role: 'system' as const,
        content: `You are CalciLab AI Assistant, a helpful and friendly calculator expert. You help users with:
- Explaining how to use various calculators
- Understanding mathematical formulas and concepts
- Providing tips for health, finance, and math calculations
- Answering questions about calculator results

Keep responses concise, helpful, and focused on calculations. Be friendly and professional.

Available calculator categories:
1. Fitness & Health: BMI, Body Fat, Calorie, TDEE, BMR, Macro, and more
2. Financial: Mortgage, Loan, Compound Interest, ROI, Investment calculators
3. Math: Percentage, Fraction, Scientific, Quadratic, Logarithm calculators
4. Date & Time: Age, Date Difference, Timezone, Countdown calculators
5. Tools: Unit Converter, Temperature, Length, Weight converters`
      },
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      { role: 'user' as const, content: message }
    ]

    const response = await zai.chat.completions.create({
      messages,
      model: 'glm-4-plus',
      temperature: 0.7,
      maxTokens: 500
    })

    const assistantMessage = response.choices[0]?.message?.content || 'I apologize, I could not process your request. Please try again.'

    return NextResponse.json({ response: assistantMessage })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
