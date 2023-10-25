import { NextRequest, NextResponse } from 'next/server';
import { validateJWT } from '@/lib/auth/AuthValidation'
import { User } from '@/lib/db/models/user';
import { db } from '@/lib/db/index';


export async function GET(request: NextRequest) {
  // if(!request.body) {
  //   return NextResponse.json({ message: 'Empty body' }, { status: 401 })
  // }
    // console.log(cookies().getAll());
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    const payload = await validateJWT(token ?? '');
    if(!payload) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }
    
    const { userId } = payload.oldToken;
    const user = new User(db);
    const friends = await user.getFriends(userId);

    return NextResponse.json({user: payload.oldToken, friends: friends}, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      } 
    });
}