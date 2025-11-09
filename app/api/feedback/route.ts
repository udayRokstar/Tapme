import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Feedback from '@/app/models/Feedback';

export async function POST(request: Request) {
  try {
    const { sessionId, rating } = await request.json();

    if (!sessionId || !rating) {
      return NextResponse.json(
        { error: 'Session ID and rating are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Create new feedback
    const feedback = await Feedback.create({
      sessionId,
      rating
    });

    return NextResponse.json(
      { success: true, data: feedback },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      // Duplicate key error (sessionId already exists)
      return NextResponse.json(
        { error: 'Feedback already submitted for this session' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Error submitting feedback' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: feedbacks });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error fetching feedback' },
      { status: 500 }
    );
  }
}
