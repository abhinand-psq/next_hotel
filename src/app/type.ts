export type categorys={
id:number,
mainname :string,
products? : [{}]
}[]

/*model category {
  id     Int     @id @default(autoincrement())
  mainname  String @unique
   products     Product[]
}

model Product{
  id      Int      @id @default(autoincrement())
  prname   String   @unique
  slug      String
  prize      Decimal
  cat     category  @relation(fields: [slug], references: [mainname])
}*/