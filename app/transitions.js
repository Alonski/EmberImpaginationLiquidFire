export default function() {
    this.transition(
        this.use("fade", {
            duration: 200,
            easing: "easeInOut"
        }),
        this.reverse("fade", {
            duration: 200,
            easing: "easeInOut"
        })
    );

    this.transition(
        this.hasClass("fadeLeft"),
        this.toValue(true),
        this.use("fade", {
            duration: 200,
            easing: "ease"
        }),
        this.reverse("fade", {
            duration: 200,
            easing: "ease"
        })
    );
}
