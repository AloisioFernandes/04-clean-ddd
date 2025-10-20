import { Entity } from "../../core/entities/entity.js";
import type { Slug } from "./value-objects/slug.js";

interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: string;
}

export class Question extends Entity<QuestionProps> {}
