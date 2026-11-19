// Count a Latin word, contraction, hyphenated term or number as one unit.
// Combining accents stay with their letter. Sentence punctuation separates words.
const words =
  /(?:\p{Script=Latin}\.(?=\p{Script=Latin}\.)|\p{Script=Latin}\p{M}*|\p{Nd}(?:[.,/](?=\p{Nd}))?)+(?:['’‐‑-](?:\p{Script=Latin}\.(?=\p{Script=Latin}\.)|\p{Script=Latin}\p{M}*|\p{Nd}(?:[.,/](?=\p{Nd}))?)+)*/gu;

export function countWords(text: string): number {
  let count = 0;
  const pattern = new RegExp(words);
  while (pattern.test(text)) count++;
  return count;
}

export function rawTextLimit(wordLimit: number): number {
  return wordLimit * 24;
}
