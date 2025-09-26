import { NextRequest, NextResponse } from 'next/server';
import { db, deployments } from '@/lib/db';

// POST trigger deployment
export async function POST(request: NextRequest) {
  try {
    // Log deployment attempt
    const newDeployment = await db.insert(deployments).values({
      status: 'pending',
      // triggeredBy would come from session in real app
    }).returning();

    // Here you would trigger your actual deployment
    // For example, call Vercel's deployment API or webhook

    // Example webhook call (replace with your deployment service):
    /*
    const webhookUrl = process.env.DEPLOYMENT_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deploy_id: newDeployment[0].id })
      });
    }
    */

    return NextResponse.json({
      message: 'Deployment triggered successfully',
      deploymentId: newDeployment[0].id
    });
  } catch (error) {
    console.error('Error triggering deployment:', error);
    return NextResponse.json({ error: 'Failed to trigger deployment' }, { status: 500 });
  }
}

// GET deployment status
export async function GET() {
  try {
    const recentDeployments = await db
      .select()
      .from(deployments)
      .orderBy(deployments.createdAt)
      .limit(10);

    return NextResponse.json(recentDeployments);
  } catch (error) {
    console.error('Error fetching deployments:', error);
    return NextResponse.json({ error: 'Failed to fetch deployments' }, { status: 500 });
  }
}