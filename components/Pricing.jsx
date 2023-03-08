import { useUser } from '@auth0/nextjs-auth0/client';

export default function Pricing() {
  const { user } = useUser();

  return (
    <div>
      <h1 className="text-5xl text-bold text-center pt-10">Pricing</h1>
      <div>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
<stripe-pricing-table pricing-table-id="prctbl_1MjJl6LL8utQT13jYHStAuFI"
publishable-key="pk_live_51Lwq19LL8utQT13jhE31iP4RC7d1inXL9mBF5eARlJRRDcM7j8552VnQZ8MDrvgOKBE3gCvPEbE2jwdHlLwDAV91008duUHIY2">
</stripe-pricing-table>
      </div>
    </div>
  );
}
