import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function FAQPage() {
  return (
    <section className="flex items-center justify-center min-h-full container mx-auto overflow-x-hidden relative">
      <div className="w-full max-w-xl">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Что нужно для того, чтобы начать пользоваться сервисом?
            </AccordionTrigger>
            <AccordionContent>
              Ничего лишнего - потребуется только завести аккаунт.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              На каком фреймворке построен сервис?
            </AccordionTrigger>
            <AccordionContent>
              Чат разработан на Nest.Js (Весь апи построен на микросервисном
              GraphQL) и Next.js.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Какова стабильность работы?</AccordionTrigger>
            <AccordionContent>
              Сервис обладает высокой стабильностью и скоростью работы благодаря
              использованию микросервисной архитектуры.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
