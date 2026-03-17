export default function Disclaimer() {
  return (
    <div className="mt-10 p-4 bg-amber-50/60 border border-amber-200/60 rounded-xl text-sm text-amber-700 leading-relaxed">
      <div className="flex gap-3">
        <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <p>
          <strong className="text-amber-800">Aviso legal:</strong> Esta herramienta
          proporciona estimaciones orientativas basadas en la normativa fiscal
          vigente. No constituye asesoramiento fiscal profesional. Las cifras
          pueden variar segun tu situacion particular. Consulta siempre con un
          asesor fiscal cualificado antes de tomar decisiones financieras.
        </p>
      </div>
    </div>
  );
}
