'use client';

export default function TermJaPage() {
  return (
    <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-auto p-4 sm:p-6 lg:p-8 w-4/5">
      <h1 className="text-2xl font-bold my-4 text-center">利用規約</h1>
      <div className="flex flex-col gap-2 my-4 text-center">
        <p className="text-sm text-gray-500">
          <strong>最終更新日:</strong> 2025年6月15日
        </p>
        <p className="text-sm text-gray-500">
          <strong>発効日:</strong> 2025年5月22日
        </p>
      </div>
      <div className="flex flex-col gap-2 my-4">
        <p>
          Turbo AI Inc.（以下、「Turbo AI」、「当社」といいます）が提供するTurbo
          AIへようこそ。本利用規約は、Turbo
          AIのウェブサイト（www.iturboai.com）の利用、およびTurbo
          AI製品（以下、「本サービス」）の購入と利用に適用されます。本サービスにアクセスまたは利用することにより、お客様は本利用規約および当社のプライバシーポリシーに拘束されることに同意したものとみなされます。
        </p>
        <h2 className="text-lg font-bold my-2">1. 利用規約への同意</h2>
        <p>
          Turbo
          AIを利用することにより、お客様は本利用規約に同意したものとします。同意しない場合は、本サービスを利用しないでください。
        </p>
        <h2 className="text-lg font-bold my-2">2. ユーザーの責任</h2>
        <p>
          お客様は、本サービスの登録または購入時に、正確かつ完全な情報を提供することに同意します。アカウントおよびパスワードの機密性を維持する責任はお客様にあります。お客様は、本サービスを合法的かつ倫理的に利用することに同意します。
        </p>
        <h2 className="text-lg font-bold my-2">3. 支払いポリシー</h2>
        <p>
          購入はStripeを通じて処理され、お客様はStripeの利用規約に同意する必要があります。返金の詳細は、当社のプライバシーポリシーに記載されています。
        </p>
        <h2 className="text-lg font-bold my-2">4. 返金ポリシー</h2>
        <p>
          当社は顧客満足を重視しており、購入日から7日間の返金ポリシーを提供しています。ただし、返金ポリシーの悪用を防ぐため、以下の方法で保護措置を講じています：
        </p>
        <ul className="list-disc list-inside pl-4 gap-2">
          <li>
            返金は、購入されたコンポーネントが広範囲にダウンロード、コピー、または使用されておらず、顧客の真の不満または状況の変化を示している場合にのみ許可されます。
          </li>
          <li>
            Figmaファイルをダウンロードした後に返金を要求することは、不誠実な不満の兆候とみなされ、返金が拒否される場合があります。
          </li>
          <li>
            顧客が当社のサービスから利益を得たと示唆する、コンポーネントの大幅な使用、コピー、またはデザインアセットのダウンロードの証拠がある場合、当社は返金要求を拒否する権利を留保します。
          </li>
          <li>
            返金を要求するには、顧客は返金期間内に当社のサポートチームに連絡し、購入詳細と返金要求の正当な理由を提供する必要があります（
            <a
              href="mailto:turboai@gmail.com"
              className="text-primary underline"
            >
              turboai@gmail.com
            </a>
            ）。
          </li>
          <li>
            すべての返金要求はケースバイケースで審査され、当社は返金の適格性に関する最終決定権を留保します。
          </li>
          <li>
            承認された返金要求は5〜7営業日以内に処理され、返金は購入時に使用された元の支払い方法に対して行われます。
          </li>
        </ul>
        <p>
          このポリシーは、お客様が安心して買い物できることを保証すると同時に、当社の知的財産とサービスの完全性を保護するために設計されています。
        </p>
        <p>
          注：英国のお客様の場合、現地の消費者保護法に従い、返金ポリシーは購入日から14日間に延長されます。
        </p>
        <h2 className="text-lg font-bold my-2">5. プライバシーポリシー</h2>
        <p>
          当社による個人情報の収集、使用、共有については、当社の
          <a href="/privacy" className="text-primary underline">
            プライバシーポリシー
          </a>
          に記載されています。
        </p>
        <h2 className="text-lg font-bold my-2">6. 知的財産権</h2>
        <p>
          コンポーネントおよびテンプレートに関するすべての知的財産権は、Turbo
          AIが所有します。お客様は、当社からの書面による明示的な許可なく、本サービスのいかなる部分も複製、複写、コピー、販売、再販、または利用しないことに同意します。
        </p>
        <h2 className="text-lg font-bold my-2">7. 利用規約の変更</h2>
        <p>
          Turbo AI
          Inc.は、いつでも本利用規約を変更する権利を留保します。変更は、掲載後直ちに有効となります。
        </p>
        <h2 className="text-lg font-bold my-2">8. 外部リンク</h2>
        <p>
          当社のサービスには、Stripeを含む外部リンクが含まれる場合があります。当社は、これらの外部サイトのコンテンツやプライバシー慣行について責任を負いません。
        </p>
        <h2 className="text-lg font-bold my-2">9. 責任の制限</h2>
        <p>
          Turbo AI
          Inc.は、本サービスの使用に起因する間接的、付随的、特別、結果的、または懲罰的な損害について一切の責任を負いません。
        </p>
        <h2 className="text-lg font-bold my-2">10. 免責</h2>
        <p>
          お客様は、本サービスの利用に起因または関連して第三者からなされたいかなる請求または要求からも、Turbo
          AI
          Inc.およびその関連会社、役員、代理人、従業員を免責し、無害に保つことに同意します。
        </p>
        <h2 className="text-lg font-bold my-2">11. 準拠法</h2>
        <p>
          本利用規約は、Turbo AI Inc.が登録されている法域の法律に準拠します。
        </p>
        <h2 className="text-lg font-bold my-2">12. 公正な利用と不正防止</h2>
        <p>
          公正な環境を確保するため、コンテンツを過度にダウンロードした後に返金を要求するなどの乱用や不正行為を監視しています。違反があった場合、アカウントの停止や返金の拒否などの措置を取ることがあります。不当に告発されたと思われる場合は、
          <a href="mailto:turboai@gmail.com" className="text-primary underline">
            turboai@gmail.com
          </a>
          までご連絡ください。
        </p>
        <h2 className="text-lg font-bold my-2">13. 連絡先情報</h2>
        <p>
          本利用規約についてご不明な点がございましたら、
          <a href="mailto:turboai@gmail.com" className="text-primary underline">
            turboai@gmail.com
          </a>
          までお問い合わせください。
        </p>
      </div>
    </div>
  );
}
