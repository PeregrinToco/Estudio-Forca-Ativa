import { useEffect, useState } from 'react';
import { Activity, Check, Dumbbell, UserPlus } from 'lucide-react';

type Student = { name: string; email: string; goal: string; level: string; workouts: number };
const plans = [
  { name: 'Força Start', price: '119,90', description: 'Flexibilidade para começar no seu ritmo.' },
  { name: 'Força Pro', price: '99,90', description: 'Acompanhamento para evoluir com consistência.' },
  { name: 'Força Black', price: '79,90', description: 'Benefícios completos para sua rotina de treino.' },
];
const storageKey = 'forca-ativa-students';

export default function App() {
  const [students, setStudents] = useState<Student[]>(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]') as Student[]; }
    catch { return []; }
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('Hipertrofia');
  const [level, setLevel] = useState('Iniciante');
  const [notice, setNotice] = useState('');

  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(students)); }, [students]);

  function register(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (!cleanName || !cleanEmail) return;
    setStudents(current => [...current, { name: cleanName, email: cleanEmail, goal, level, workouts: 0 }]);
    setName(''); setEmail('');
    setNotice('Cadastro salvo neste navegador.');
    window.setTimeout(() => setNotice(''), 3500);
  }

  function completeWorkout(index: number) {
    setStudents(current => current.map((student, i) => i === index ? { ...student, workouts: student.workouts + 1 } : student));
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-neutral-800 px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a className="text-lg font-black uppercase tracking-tight" href="#inicio"><span className="text-orange-500">Estúdio</span> Força Ativa</a>
          <nav className="flex gap-5 text-sm text-neutral-300"><a href="#planos">Planos</a><a href="#cadastro">Cadastro</a><a href="#alunos">Alunos</a></nav>
        </div>
      </header>
      <main id="inicio" className="mx-auto max-w-6xl space-y-16 px-6 py-12">
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8 md:p-14">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-orange-500">Treinamento personalizado</p>
          <h1 className="max-w-3xl text-4xl font-black uppercase leading-tight md:text-6xl">Treinamento não define só corpo, <span className="text-orange-500">mas sim uma vida.</span></h1>
          <p className="mt-5 max-w-2xl text-neutral-300">Conheça os planos, registre seu perfil e acompanhe sua jornada de treino.</p>
          <a href="#cadastro" className="mt-7 inline-flex items-center gap-2 rounded bg-orange-500 px-5 py-3 font-bold"><UserPlus size={18}/> Fazer cadastro</a>
        </section>

        <section id="planos">
          <h2 className="mb-6 text-3xl font-black uppercase">Planos do estúdio</h2>
          <div className="grid gap-4 md:grid-cols-3">{plans.map(plan => <article key={plan.name} className="rounded-xl border border-neutral-800 bg-neutral-900 p-6"><h3 className="text-xl font-black text-orange-500">{plan.name}</h3><p className="my-3 text-sm text-neutral-300">{plan.description}</p><p className="text-3xl font-black">R$ {plan.price}<span className="text-sm font-normal text-neutral-400"> / mês</span></p><ul className="mt-5 space-y-2 text-sm text-neutral-300"><li className="flex gap-2"><Check size={17} className="text-orange-500"/> Treinos adequados ao seu nível</li><li className="flex gap-2"><Check size={17} className="text-orange-500"/> Acompanhamento de progresso</li></ul></article>)}</div>
        </section>

        <section id="cadastro" className="grid gap-8 md:grid-cols-2">
          <div><p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-orange-500"><Dumbbell size={17}/> Comece sua jornada</p><h2 className="text-3xl font-black uppercase">Cadastro de aluno</h2><p className="mt-3 text-neutral-400">Os dados preenchidos são guardados somente no armazenamento local deste navegador.</p></div>
          <form onSubmit={register} className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
            <label className="block text-sm">Nome<input required value={name} onChange={e => setName(e.target.value)} className="field" autoComplete="name" /></label>
            <label className="block text-sm">E-mail<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="field" autoComplete="email" /></label>
            <div className="grid grid-cols-2 gap-3"><label className="block text-sm">Nível<select value={level} onChange={e => setLevel(e.target.value)} className="field"><option>Iniciante</option><option>Intermediário</option><option>Avançado</option></select></label><label className="block text-sm">Objetivo<select value={goal} onChange={e => setGoal(e.target.value)} className="field"><option>Hipertrofia</option><option>Emagrecimento e definição</option><option>Força</option><option>Condicionamento físico</option><option>Saúde e mobilidade</option></select></label></div>
            <button className="w-full rounded bg-orange-500 px-4 py-3 font-bold hover:bg-orange-400">Cadastrar</button>
            {notice && <p role="status" className="text-sm text-green-400">{notice}</p>}
          </form>
        </section>

        <section id="alunos">
          <div className="mb-5 flex items-center gap-2"><Activity className="text-orange-500"/><h2 className="text-3xl font-black uppercase">Acompanhamento</h2></div>
          {students.length === 0 ? <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-neutral-400">Nenhum cadastro neste navegador ainda.</p> : <div className="grid gap-4 md:grid-cols-2">{students.map((student, index) => <article key={`${student.email}-${index}`} className="rounded-xl border border-neutral-800 bg-neutral-900 p-6"><h3 className="text-lg font-bold">{student.name}</h3><p className="text-sm text-neutral-400">{student.level} · {student.goal}</p><p className="mt-4 text-sm">Treinos registrados: <strong className="text-orange-500">{student.workouts}</strong></p><button onClick={() => completeWorkout(index)} className="mt-4 rounded border border-neutral-700 px-4 py-2 text-sm hover:border-orange-500">Registrar treino concluído</button></article>)}</div>}
        </section>
      </main>
      <footer className="border-t border-neutral-800 px-6 py-7 text-center text-sm text-neutral-500">Estúdio Força Ativa · Demonstração sem backend</footer>
    </div>
  );
}
