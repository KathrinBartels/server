import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCourseDto,
  EditCourseDto,
} from './dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  getCourses(userId: number) {
    return this.prisma.course.findMany({
      where: {
        userId,
      },
    });
  }

  getCourseById(
    userId: number,
    courseId: number,
  ) {
    return this.prisma.course.findFirst({
      where: {
        id: courseId,
        userId,
      },
    });
  }

  async createCourse(
    userId: number,
    dto: CreateCourseDto,
  ) {
    const course =
      await this.prisma.course.create({
        data: {
          userId,
          ...dto,
        },
      });

    return course;
  }

  async editCourseById(
    userId: number,
    courseId: number,
    dto: EditCourseDto,
  ) {
    // get the course by id
    const course =
      await this.prisma.course.findUnique({
        where: {
          id: courseId,
        },
      });

    // check if user owns the course
    if (!course || course.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteCourseById(
    userId: number,
    courseId: number,
  ) {
    const course =
      await this.prisma.course.findUnique({
        where: {
          id: courseId,
        },
      });

    // check if user owns the course
    if (!course || course.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.course.delete({
      where: {
        id: courseId,
      },
    });
  }
}
