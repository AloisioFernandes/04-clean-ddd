import { UniqueEntityID } from "@/core/entities/unique-entity-id.js";
import {
  Question,
  type QuestionProps,
} from "@/domain/forum/enterprise/entities/question.js";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug.js";

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: "Example Question",
    content: "This is an example question content.",
    slug: Slug.create("example-question"),
    ...override,
  });

  return question;
}
