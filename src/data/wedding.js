
export const wedding = {
  bride: 'Kinga',
  groom: 'Michał',
  year: 2027,
  // Data i godzina ceremonii (na potrzeby kalendarza i odliczania)
  ceremonyDateTime: '2027-04-24T16:00:00',
  // Koniec wesela (na potrzeby kalendarza i widoku "po ślubie")
  endDateTime: '2027-04-25T04:00:00',
  city: 'Warszawa',
  rsvpDeadline: '28 lutego 2027',
};


export const tally = {
  formId: 'ODjb1g',
};

export const venues = {
  ceremony: {
    title: 'Ceremonia Ślubna',
    name: 'Parafia pw. św. Zygmunta',
    address1: 'Plac Konfederacji 55',
    address2: '01-834 Warszawa',
    time: '16:00',
    mapsLink: 'https://maps.app.goo.gl/WXoWZUWh7tDLzjoy7',
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2441.0181010310275!2d20.94370857637261!3d52.27937335401735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecbccf7ca131d%3A0x8c8206ec22e7f892!2zS2_Fm2Npw7PFgiBSenltc2tva2F0b2xpY2tpIHB3LiDFm3cuIFp5Z211bnRh!5e0!3m2!1spl!2spl!4v1773127174924!5m2!1spl!2spl',
  },
  reception: {
    title: 'Wesele',
    name: 'Sala Weselna Ostoja',
    address1: 'Marmurowa 11',
    address2: '03-053 Warszawa',
    time: '18:00',
    mapsLink: 'https://maps.app.goo.gl/xE75TjZVjaR63TvY9',
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.256688531455!2d20.940972776377794!3d52.365765447637614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ec81ef57fe173%3A0x973f96a8918f350f!2sSala%20weselna%20Ostoja!5e0!3m2!1spl!2spl!4v1773127312830!5m2!1spl!2spl',
  },
};

export const contacts = [
  {
    name: 'Kinga',
    phoneDisplay: '507 562 811',
    phoneHref: 'tel:+48507562811',
    email: 'kingawojcik5252@gmail.com',
    testIdPrefix: 'kinga',
  },
  {
    name: 'Michał',
    phoneDisplay: '511 779 350',
    phoneHref: 'tel:+48511779350',
    email: 'michalokozak@gmail.com',
    testIdPrefix: 'michal',
  },
];

export const faqData = [
  {
    question: 'Czy ceremonia i wesele odbywają się w tym samym miejscu?',
    answer:
      'Nie. Ceremonia ślubna odbędzie się w kościele, natomiast przyjęcie weselne w sali weselnej. Dokładne adresy znajdziecie w zakładce "Jak do nas dojechać".',
  },
  {
    question: 'Czy będzie zapewniony transport między kościołem a salą?',
    answer:
      'Nie organizujemy wspólnego transportu. Do sali można wygodnie dojechać samochodem lub skorzystać z usług przewozowych, takich jak Uber.',
  },
  {
    question: 'Czy można przyjść z osobą towarzyszącą?',
    answer:
      'Oczywiście – jeśli na zaproszeniu została wskazana osoba towarzysząca, będzie nam bardzo miło gościć Was razem.',
  },
  {
    question: 'Czy dzieci są zaproszone?',
    answer: 'Tak. Jeśli planujecie przyjechać z dziećmi, będą one mile widziane.',
  },
  {
    question: 'Czy będą poprawiny?',
    answer:
      'Nie planujemy poprawin – chcemy w pełni nacieszyć się wspólnym świętowaniem tego jednego dnia.',
  },
  {
    question: 'Jakie prezenty sprawią nam największą radość?',
    answer:
      'Najwygodniejszą formą prezentu będzie koperta. Jeśli jednak ktoś chciałby podarować również drobny upominek, z pewnością sprawi nam to dużą przyjemność.',
  },
  {
    question: 'Czy zapewniamy nocleg dla gości?',
    answer:
      'Nie organizujemy noclegów, jednak w pobliżu sali weselnej znajduje się kilka hoteli, z których można skorzystać według własnych preferencji.',
  },
  {
    question: 'Czy można zgłosić dietę specjalną?',
    answer:
      'Tak, oczywiście. Jeśli jesteście wegetarianami lub macie alergie pokarmowe, prosimy o informację podczas potwierdzania obecności – zadbamy o odpowiednie menu.',
  },
  {
    question: 'Do kiedy należy potwierdzić obecność?',
    answer:
      'Będziemy bardzo wdzięczni za potwierdzenie przybycia do 28 lutego 2027 roku. Można to zrobić telefonicznie lub mailowo – dane znajdziecie w zakładce Kontakt.',
  },
  {
    question: 'Czy na miejscu będzie parking?',
    answer:
      'Tak. Przy kościele znajduje się parking wzdłuż ulicy. Sala weselna dysponuje dużym placem parkingowym, na którym będzie można zostawić samochód.',
  },
  {
    question: 'Czy można robić zdjęcia podczas ceremonii?',
    answer:
      'Podczas ceremonii w kościele prosimy o pozostawienie fotografowania naszemu fotografowi. Po zakończeniu ceremonii oraz podczas przyjęcia zachęcamy do robienia zdjęć i uwieczniania wspólnych chwil.',
  },
];

export const navLinks = [
  { id: 'welcome', label: 'Zaproszenie' },
  { id: 'countdown-section', label: 'Odliczanie' },
  { id: 'timeline', label: 'Plan dnia' },
  { id: 'venues', label: 'Miejsca' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Kontakt' },
];
