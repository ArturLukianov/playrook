import { DoorOpenIcon, GitBranch, Shield } from 'lucide-react'

export default function About() {
  return (
    <div className="flex flex-col items-center pt-8 justify-center h-full font-mono">
      <div className="text-4xl font-mono flex flex-row items-center gap-2 content-center text-center mb-3">
        <DoorOpenIcon className="ml-2 text-orange-500 inline" size={32} />
        <span className="font-semibold">PlayRook</span> это:
      </div>

      <div className="grid grid-cols-1 gap-10 w-1/2 mt-4">
        {/* Card 1 */}
        <div className="p-8 rounded-2xl shadow-md">
          <div className="flex items-center mb-6">
            <div className="bg-blue-950 p-3 rounded-lg mr-4">
              <Shield className="h-8 w-8 text-blue-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-300">
              Специализированный инструмент для SOC
            </h3>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Playrook – это специализированная платформа для разработки и
            выполнения плейбуков, созданная специально для команд Security
            Operations Center (SOC). Наш инструмент превращает сложные процессы
            в последовательные, воспроизводимые рабочие потоки, позволяя
            мгновенно реагировать на угрозы.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-8 rounded-2xl shadow-md">
          <div className="flex items-center mb-6">
            <div className="bg-yellow-100 p-3 rounded-lg mr-4">
              <GitBranch className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-300">
              Мощный синтаксис Markdown
            </h3>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Ключевая особенность Playrook – использование простого, но мощного
            синтаксиса Markdown для создания плейбуков. Плейбуки организуются в
            виде древовидных структур с ветвлениями, что отражает реальные
            сценарии принятия решений при анализе атак.
          </p>
        </div>
      </div>
    </div>
  )
}
