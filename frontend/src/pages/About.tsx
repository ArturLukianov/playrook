import { DoorOpenIcon, GitBranch, Shield } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { pageSEO } from '@/hooks/useSEO';

export default function About() {
  // Set SEO metadata for about page
  useSEO(pageSEO.about);

  return (
    <div className="flex flex-col items-center pt-4 md:pt-8 justify-center h-full font-mono px-4">
      <div className="text-2xl md:text-4xl font-mono flex flex-col md:flex-row items-center gap-2 content-center text-center mb-3">
        <div className="flex items-center gap-2">
          <DoorOpenIcon className="text-orange-500" size={24} />
          <span className="font-semibold">PlayRook</span>
        </div>
        <span>это:</span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-10 w-full max-w-2xl md:w-1/2 mt-4">
        {/* Card 1 */}
        <div className="p-4 md:p-8 rounded-2xl shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-0">
            <div className="bg-blue-950 p-2 md:p-3 rounded-lg md:mr-4 self-center md:self-start">
              <Shield className="h-6 w-6 md:h-8 md:w-8 text-blue-300" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-300 text-center md:text-left">
              Специализированный инструмент для SOC
            </h3>
          </div>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            Playrook – это специализированная платформа для разработки и
            выполнения плейбуков, созданная специально для команд Security
            Operations Center (SOC). Наш инструмент превращает сложные процессы
            в последовательные, воспроизводимые рабочие потоки, позволяя
            мгновенно реагировать на угрозы.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-4 md:p-8 rounded-2xl shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center mb-4 md:mb-6 gap-3 md:gap-0">
            <div className="bg-yellow-100 p-2 md:p-3 rounded-lg md:mr-4 self-center md:self-start">
              <GitBranch className="h-6 w-6 md:h-8 md:w-8 text-yellow-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-300 text-center md:text-left">
              Мощный синтаксис Markdown
            </h3>
          </div>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            Ключевая особенность Playrook – использование простого, но мощного
            синтаксиса Markdown для создания плейбуков. Плейбуки организуются в
            виде древовидных структур с ветвлениями, что отражает реальные
            сценарии принятия решений при анализе атак.
          </p>
        </div>
      </div>
    </div>
  );
}
