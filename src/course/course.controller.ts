import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { CourseService } from './course.service';
import {
  CreateCourseDto,
  EditCourseDto,
} from './dto';

@UseGuards(JwtGuard)
@Controller('courses')
export class CourseController {
  constructor(
    private courseService: CourseService,
  ) {}

  @Get()
  getCourses(@GetUser('id') userId: number) {
    return this.courseService.getCourses(userId);
  }

  @Get(':id')
  getCourseById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) courseId: number,
  ) {
    return this.courseService.getCourseById(
      userId,
      courseId,
    );
  }

  @Post()
  createCourse(
    @GetUser('id') userId: number,
    @Body() dto: CreateCourseDto,
  ) {
    return this.courseService.createCourse(
      userId,
      dto,
    );
  }

  @Patch(':id')
  editCourseById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) courseId: number,
    @Body() dto: EditCourseDto,
  ) {
    return this.courseService.editCourseById(
      userId,
      courseId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCourseById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) courseId: number,
  ) {
    return this.courseService.deleteCourseById(
      userId,
      courseId,
    );
  }
}
