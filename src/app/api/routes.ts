import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { User } from '@/lib/models/User';
import { connectDB } from '@/lib/db/mongoose';

// Register route
export async function register(request: NextRequest) {
  try {
    await connectDB();
    const { email, password, name, phone, userType } = await request.json();

    if (!userType || !['user', 'admin', 'serviceProvider'].includes(userType)) {
      return NextResponse.json({ success: false, message: 'Invalid user type' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, hashedPassword, name, phone, userType });

    return NextResponse.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error("Registration error:", error); // Log the error to avoid ESLint warning
    return NextResponse.json({ success: false, message: 'Registration failed' });
  }
}

// Login route
export async function login(request: NextRequest) {
  try {
    await connectDB();
    const { email, password, userType } = await request.json();

    if (!userType || !['user', 'admin', 'serviceProvider'].includes(userType)) {
      return NextResponse.json({ success: false, message: 'Invalid user type' });
    }

    const user = await User.findOne({ email, userType });
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' });
    }

    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid password' });
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error("Login error:", error); // Log the error to avoid ESLint warning
    return NextResponse.json({ success: false, message: 'Login failed' });
  }
}
