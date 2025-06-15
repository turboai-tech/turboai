'use client';

export default function ClaimZhPage() {
  return (
    <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-auto p-4 sm:p-6 lg:p-8 w-4/5">
      <h1 className="text-2xl font-bold my-4 text-center">免责声明</h1>
      <div className="flex flex-col gap-2 my-4 text-center">
        <p className="text-sm text-gray-500">
          <strong>最后更新：</strong> 2025年6月15日
        </p>
      </div>
      <div className="flex flex-col gap-2 my-4">
        <p>
          特铱铂智能科技（上海）有限公司（"我们"）在
          www.iturboai.com（"本网站"）以及通过我们的软件即服务产品（"本服务"）提供的信息和服务仅供一般参考和实际用途。
        </p>

        <h2 className="text-lg font-bold my-2">1. 非专业建议</h2>
        <p>
          由我们的人工智能服务生成的内容、组件、模板及任何材料，均非旨在替代专业建议。您不应依赖我们服务提供的信息作为做出任何商业、法律、设计或其他决策的基础。若有任何具体问题，请务必咨询合格的专业人士。
        </p>

        <h2 className="text-lg font-bold my-2">2. "按原样"和"按可用"提供</h2>
        <p>
          本网站上的所有信息和服务均出于善意提供；但是，我们对本网站或服务上任何信息或生成内容的准确性、充分性、有效性、可靠性、可用性或完整性，不作任何明示或暗示的陈述或保证。本服务在"按原样"和"按可用"的基础上提供。
        </p>

        <h2 className="text-lg font-bold my-2">3. 人工智能生成内容</h2>
        <p>我们的服务利用人工智能生成内容。您承认并同意：</p>
        <ul className="list-disc list-inside pl-4 gap-2">
          <li>
            人工智能生成的内容可能包含错误、不准确之处或不完整。它也可能生成与其他用户生成的内容相似或相同的内容。
          </li>
          <li>
            我们不保证任何人工智能生成内容的独特性、准确性或对特定用途的适用性。
          </li>
          <li>
            您全权负责在使用或发布前，审查、编辑和验证我们服务生成的任何内容。您使用人工智能生成内容的风险由您自行承担。
          </li>
        </ul>

        <h2 className="text-lg font-bold my-2">4. 外部链接免责声明</h2>
        <p>
          本网站和服务可能包含指向属于或源自第三方的其他网站或内容的链接。我们不会对这些外部链接的准确性、充分性、有效性、可靠性、可用性或完整性进行调查、监控或检查。我们不保证、认可、担保或承担第三方网站提供的任何信息的责任。
        </p>

        <h2 className="text-lg font-bold my-2">5. 不保证结果</h2>
        <p>
          我们不保证您使用我们的服务会取得任何具体成果。您的成功取决于许多因素，包括您自身的努力、技能以及对生成内容的应用。
        </p>

        <h2 className="text-lg font-bold my-2">6. 责任限制</h2>
        <p>
          在任何情况下，对于因使用本网站或服务，或依赖所提供的任何信息而导致的任何形式的损失或损害，我们概不承担任何责任。您使用本网站和服务以及依赖任何信息的风险完全由您自行承担。
        </p>
      </div>
    </div>
  );
}
